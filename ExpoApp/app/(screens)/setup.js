import { router } from "expo-router";
import React, { Component, Fragment } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import setup from "../../assets/images/setup.png";
import GlobalStyles from "../../styles/styles";
import { useHOCS } from "../../hooks/useHOCS";
import ContextModule from "../../utils/contextModule";
import { setAsyncStorageValue } from "../../utils/utils";

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      loading: false,
    };
  }

  static contextType = ContextModule;

  async componentDidUpdate(prevProps) {
    if (this.props.wallet?.status !== prevProps.wallet?.status) {
      if (this.props.wallet?.status === "connected") {
        await setAsyncStorageValue({
          address: this.props.wallet.account.address,
        });
        this.context.setValue(
          {
            address: this.props.wallet.account.address,
          },
          () => router.replace("/main")
        );
      }
    }
    if (this.props.focus !== prevProps.focus && this.props.focus !== null) {
      if (this.props.focus) {
        console.log("Focus Setup");
      } else if (!this.props.focus) {
        console.log("Blur Setup");
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={[GlobalStyles.container, { paddingVertical: 20 }]}>
        <Image
          source={setup}
          alt="Cat"
          style={{
            height: 2048,
            width: 1148,
            maxWidth: Dimensions.get("window").width,
            maxHeight: Dimensions.get("window").height * 0.8,
            resizeMode: "contain",
          }}
        />
        <View style={GlobalStyles.buttonContainer}>
          <Pressable
            disabled={this.state.loading}
            style={[
              GlobalStyles.buttonStyle,
              this.state.loading ? { opacity: 0.5 } : {},
            ]}
            onPress={() => {
              this.setState({ loading: true });
              this.props
                .login({ loginMethods: ["email"] })
                .then(() => {
                  if (this.props.wallet?.status === "not-created") {
                    this.props.wallet.create();
                  }
                })
                .catch((err) => {
                  this.setState({ loading: false });
                });
            }}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              Login with Email
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}

export default useHOCS(Setup);
