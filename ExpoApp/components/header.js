import React, { Component, Fragment } from "react";
import { Image, View } from "react-native";
import Renders from "../assets/images/icon.png";
import Title from "../assets/images/title.png";
import GlobalStyles, { backgroundColor, header, mainColor } from "../styles/styles";
import LinearGradient from "react-native-linear-gradient";

export default class Header extends Component {
  render() {
    const headerTitleSize = 5;
    const headerIconSize = 4;
    return (
      <Fragment>
        <View style={[GlobalStyles.header]}>
          <View style={GlobalStyles.headerItem}>
            <Image
              source={Renders}
              alt="Logo"
              style={{
                maxHeight: "80%",
                maxWidth: header,
                width: 100,
                resizeMode: "contain",
                alignSelf: "flex-start",
                marginLeft: 16,
              }}
            />
          </View>
          <View style={[GlobalStyles.headerItem]}>
            <Image
              source={Title}
              alt="Logo"
              style={{
                maxHeight: "auto",
                maxWidth: "80%",
                resizeMode: "contain",
                alignSelf: "flex-end",
                marginRight: 16,
              }}
            />
          </View>
        </View>
        <LinearGradient
          style={[GlobalStyles.hr]}
          colors={GlobalStyles.hr.colors}
        />
      </Fragment>
    );
  }
}
