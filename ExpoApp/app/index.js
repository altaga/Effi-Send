import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoSplash from "../assets/images/icon.png";
import GlobalStyles from "../styles/styles";
import { useHOCS } from "../hooks/useHOCS";
import { router } from "expo-router";
import { getAsyncStorageValue } from "../utils/utils";
import ContextModule from "../utils/contextModule";

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = ContextModule;

  async componentDidMount() {
    const address = await getAsyncStorageValue("address");
    const usdConversion = await getAsyncStorageValue("usdConversion");
    const balances = await getAsyncStorageValue("balances");
    const chatGeneral = await getAsyncStorageValue("chatGeneral");
    const fromChain = await getAsyncStorageValue("fromChain");
    const toChain = await getAsyncStorageValue("toChain");
    this.context.setValue({
      address: address ?? this.context.value.address,
      usdConversion: usdConversion ?? this.context.value.usdConversion,
      balances: balances ?? this.context.value.balances,
      chatGeneral: chatGeneral ?? this.context.value.chatGeneral,
      fromChain: fromChain ?? this.context.value.fromChain,
      toChain: toChain ?? this.context.value.toChain,
    });
    if (this.props.privy?.isReady) {
      if (this.props.privy.user !== null) {
        router.replace("/main");
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.privy.isReady !== prevProps.privy.isReady &&
      this.props.privy.isReady
    ) {
      if (this.props.privy.user !== null) {
        router.replace(`/main`);
      } else {
        router.replace("/setup");
      }
    }
  }
  render() {
    return (
      <SafeAreaView style={[GlobalStyles.containerCentered, { paddingTop: 0 }]}>
        <Image
          resizeMode="contain"
          source={logoSplash}
          alt="Main Logo"
          style={{
            width: Dimensions.get("window").width * 0.6,
            marginBottom: 10,
          }}
        />
      </SafeAreaView>
    );
  }
}

export default useHOCS(Splash);
