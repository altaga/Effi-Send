import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { useHOCS } from "../../hooks/useHOCS";
import GlobalStyles, {
  contrast,
  contrastTab,
  mainColor,
} from "../../styles/styles";
import ContextModule from "../../utils/contextModule";
import Tab1 from "./tabs/tab1";
import Tab4 from "./tabs/tab4";
import LinearGradient from "react-native-linear-gradient";

const BaseStateMain = {
  tab: 0, // 0 wallet, 1 savings, 2 cards, 3 chat
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = BaseStateMain;
  }

  static contextType = ContextModule;

  componentDidUpdate(prevProps) {
    if (this.props.focus !== prevProps.focus && this.props.focus !== null) {
      if (this.props.focus) {
        console.log("Focus Main");
      } else if (!this.props.focus) {
        console.log("Blur Main");
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={[GlobalStyles.container]}>
        <Header />
        <View style={[GlobalStyles.main]}>
          {this.state.tab === 0 && <Tab1 />}
          {this.state.tab === 3 && <Tab4 />}
        </View>
        <LinearGradient
          style={[GlobalStyles.hr]}
          colors={GlobalStyles.hr.colors}
        />
        <View style={[GlobalStyles.footer]}>
          <Pressable
            style={GlobalStyles.selector}
            onPress={() =>
              this.setState({
                tab: 0,
              })
            }
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={GlobalStyles.selectorText.iconSize}
              color={this.state.tab === 0 ? mainColor : contrast}
            />
            <Text
              style={[
                GlobalStyles.selectorText,
                {
                  color: this.state.tab === 0 ? mainColor : contrast,
                },
              ]}
            >
              Wallet
            </Text>
          </Pressable>
          <Pressable
            style={GlobalStyles.selector}
            onPress={() =>
              this.setState({
                tab: 3,
              })
            }
          >
            <Ionicons
              name="chatbubbles-sharp"
              size={GlobalStyles.selectorText.iconSize}
              color={this.state.tab === 3 ? mainColor : contrast}
            />
            <Text
              style={[
                GlobalStyles.selectorText,
                {
                  color: this.state.tab === 3 ? mainColor : contrast,
                },
              ]}
            >
              Chat
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}

export default useHOCS(Main);
