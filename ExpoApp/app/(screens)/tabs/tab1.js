import { ethers } from "ethers";
import React, { Component, Fragment } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { abiBatchTokenBalances } from "../../../contracts/batchTokenBalances";
import GlobalStyles, {
  backgroundColor,
  balanceHeight,
  mainColor,
} from "../../../styles/styles";
import { blockchains, refreshTime } from "../../../constants/constants";
import ContextModule from "../../../utils/contextModule";
import {
  arraySum,
  epsilonRound,
  getAsyncStorageValue,
  setAsyncStorageValue,
} from "../../../utils/utils";
import { useHOCS } from "../../../hooks/useHOCS";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const baseTab1State = {
  refreshing: false,
  nfcSupported: true,
};

class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = baseTab1State;
    this.provider = blockchains.map(
      (x) => new ethers.providers.JsonRpcProvider(x.rpc)
    );
    this.controller = new AbortController();
  }
  static contextType = ContextModule;

  async componentDidMount() {
    const lastRefresh = await this.getLastRefresh();
    if (Date.now() - lastRefresh >= refreshTime) {
      await setAsyncStorageValue({ lastRefresh: Date.now().toString() });
      this.refresh();
    } else {
      console.log(
        `Next refresh Available: ${Math.round(
          (refreshTime - (Date.now() - lastRefresh)) / 1000
        )} Seconds`
      );
    }
  }

  async setStateAsync(value) {
    return new Promise((resolve) => {
      this.setState(
        {
          ...value,
        },
        () => resolve()
      );
    });
  }

  async refresh() {
    await this.setStateAsync({ refreshing: true });
    await Promise.all([this.getUSD(), this.getBalances()]);
    await this.setStateAsync({ refreshing: false });
  }

  // Get Balances

  async getBatchBalances() {
    const address = this.context.value.address;
    const tokensArrays = blockchains
      .map((x) =>
        x.tokens.filter(
          (token) =>
            token.address !== "0x0000000000000000000000000000000000000000"
        )
      )
      .map((x) => x.map((y) => y.address));
    const batchBalancesContracts = blockchains.map(
      (x, i) =>
        new ethers.Contract(
          x.batchBalancesAddress,
          abiBatchTokenBalances,
          this.provider[i]
        )
    );
    const nativeBalances = await Promise.all(
      this.provider.map(
        (x) => x.getBalance(address) ?? ethers.BigNumber.from(0)
      )
    );
    const tokenBalances = await Promise.all(
      batchBalancesContracts.map(
        (x, i) =>
          x.batchBalanceOf(address, tokensArrays[i]) ?? ethers.BigNumber.from(0)
      )
    );
    let balancesMerge = [];
    nativeBalances.forEach((x, i) =>
      balancesMerge.push([x, ...tokenBalances[i]])
    );
    const balances = blockchains.map((x, i) =>
      x.tokens.map((y, j) => {
        return ethers.utils.formatUnits(balancesMerge[i][j], y.decimals);
      })
    );
    return balances;
  }

  async getBalances() {
    const balances = await this.getBatchBalances();
    setAsyncStorageValue({ balances });
    this.context.setValue({ balances });
  }

  // USD Conversions

  async getUSD() {
    const array = blockchains
      .map((x) => x.tokens.map((token) => token.coingecko))
      .flat();
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    var requestOptions = {
      signal: this.controller.signal,
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${array.toString()}&vs_currencies=usd`,
      requestOptions
    );
    const result = await response.json();
    const usdConversionTemp = array.map((x) => result[x].usd);
    let acc = 0;
    const usdConversion = blockchains.map((blockchain) =>
      blockchain.tokens.map(() => {
        acc++;
        return usdConversionTemp[acc - 1];
      })
    );
    setAsyncStorageValue({ usdConversion });
    this.context.setValue({ usdConversion });
  }

  async getLastRefresh() {
    try {
      const lastRefresh = await getAsyncStorageValue("lastRefresh");
      if (lastRefresh === null) throw "Set First Date";
      return lastRefresh;
    } catch (err) {
      await setAsyncStorageValue({ lastRefresh: "0".toString() });
      return 0;
    }
  }

  render() {
    const iconSize = 38;
    return (
      <Fragment>
        <LinearGradient
          style={[GlobalStyles.componentContainer]}
          colors={GlobalStyles.balanceGradient}
        >
          <Text style={GlobalStyles.balanceText}>Account Balance</Text>
          <Text style={[GlobalStyles.balanceAmount]}>
            {`$ ${epsilonRound(
              arraySum(
                this.context.value.balances
                  .map((blockchain, i) =>
                    blockchain.map(
                      (token, j) =>
                        token * this.context.value.usdConversion[i][j]
                    )
                  )
                  .flat()
              ),
              2
            )} USD`}
          </Text>
        </LinearGradient>
        <View
          style={[GlobalStyles.componentContainer, { flexDirection: "row" }]}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable
              onPress={() => router.navigate(`/send`)}
              style={GlobalStyles.singleButton}
            >
              <Ionicons
                name="arrow-up-outline"
                size={GlobalStyles.singleButtonText.iconSize}
                color={"white"}
              />
            </Pressable>
            <Text style={GlobalStyles.singleButtonText}>Send</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable
              onPress={() => {
                this.props
                  .fundWallet({
                    address: this.context.value.address,
                  })
                  .then(() => this.refresh())
                  .catch((err) => console.log(JSON.stringify(err.error)));
              }}
              style={GlobalStyles.singleButton}
            >
              <Ionicons
                name="arrow-down-outline"
                size={GlobalStyles.singleButtonText.iconSize}
                color={"white"}
              />
            </Pressable>
            <Text style={GlobalStyles.singleButtonText}>Receive</Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              progressBackgroundColor={mainColor}
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                await setAsyncStorageValue({
                  lastRefresh: Date.now().toString(),
                });
                await this.refresh();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          style={GlobalStyles.scrollableContainer}
          contentContainerStyle={GlobalStyles.scrollableContentContainer}
        >
          {blockchains.map((blockchain, i) =>
            blockchain.tokens.map((token, j) => (
              <View
                key={i * blockchain.tokens.length + j}
                style={GlobalStyles.network}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={GlobalStyles.networkMarginIcon}>
                    <View>{token.icon}</View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text style={GlobalStyles.networkTokenName}>
                      {token.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text style={GlobalStyles.networkTokenData}>
                        {this.context.value.balances[i][j] === 0
                          ? "0"
                          : this.context.value.balances[i][j] < 0.001
                          ? "<0.01"
                          : epsilonRound(
                              this.context.value.balances[i][j],
                              2
                            )}{" "}
                        {token.symbol}
                      </Text>
                      <Text style={GlobalStyles.networkTokenData}>
                        {`  -  ($${epsilonRound(
                          this.context.value.usdConversion[i][j],
                          4
                        )} USD)`}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    GlobalStyles.networkTokenName,
                    { marginHorizontal: 20 },
                  ]}
                >
                  $
                  {epsilonRound(
                    this.context.value.balances[i][j] *
                      this.context.value.usdConversion[i][j],
                    2
                  )}{" "}
                  USD
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </Fragment>
    );
  }
}

export default useHOCS(Tab1);
