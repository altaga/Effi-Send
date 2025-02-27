import { Dimensions, StatusBar, StyleSheet } from "react-native";

export const mainColor = "#4286F5";
export const secondaryColor = "#F5B142";
export const tertiaryColor = "#F542DF";
export const quaternaryColor = "#42F557";
export const contrastNetwork = "#EFEFEF";
export const contrast = "#b0b0b0";
export const contrastTopBottom = "#E0E0E0";

export const themeDark = false;

export const backgroundColor = "#ffffff";
export const backgroundTopBottom = "#ffffff";
export const textColor = "#404040";

export const header = 60;
export const footer = 60;
export const ratio =
  Dimensions.get("window").height / Dimensions.get("window").width;

const GlobalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor,
  },
  containerCentered: {
    flex: 1,
    width: Dimensions.get("window").width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor,
    paddingTop: StatusBar.currentHeight,
  },
  componentContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 140,
  },
  scrollableContainer: {
    flex: 1,
    width: "100%",
  },
  scrollableContentContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // Sub containers
  hr: {
    height: 1,
    width: "100%",
    colors: [backgroundColor, contrastTopBottom, backgroundColor],
  },
  header: {
    height: header,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: backgroundTopBottom,
  },
  main: {
    flex: 1,
    backgroundColor: backgroundColor,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    width: Dimensions.get("window").width,
    height: footer,
    flexDirection: "row",
    backgroundColor: backgroundTopBottom,
  },
  // Header Items
  headerItem: {
    width: Dimensions.get("window").width / 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // Footer Items
  selector: {
    width: Dimensions.get("window").width * 0.5,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  selectorText: {
    fontSize: 16,
    iconSize: 20, // This isn't CSS but it works to change the icon size
    color: textColor,
    textAlign: "center",
    fontFamily: "Exo2-Regular",
  },
  // Balance Container
  balanceAmount: {
    fontSize: 38,
    color: textColor,
  },
  balanceText: {
    fontSize: 32,
    color: textColor,
  },
  balanceGradient: [backgroundColor, contrastTopBottom, backgroundColor],
  // Address Container
  addressContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  addressText: {
    fontSize: 18,
    color: textColor,
    textAlign: "center",
  },
  // Chat Container
  chatContainer: {
    flex: 1,
    width: "100%",
  },
  chatContentContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  chatText: {
    fontSize: 18,
    color: textColor,
    textAlign: "center",
  },
  //////////////////////////////////// Buttons /////////////////////////////////
  // Single Buttons
  singleButton: {
    backgroundColor: mainColor,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  singleButtonText: {
    color: textColor,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Exo2-Regular",
    fontSize: 16,
    iconSize: 38, // This isn't CSS but it works to change the icon size
  },
  // Tittles
  title: {
    fontSize: 32,
    color: textColor,
    textAlign: "center",
    fontFamily: "Exo2-Bold",
  },
  titlePaymentToken: {
    fontSize: 32,
    color: textColor,
    textAlign: "center",
    fontFamily: "Exo2-Bold",
    marginVertical: 36,
  },
  description: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: textColor,
  },
  formTitle: {
    color: textColor,
    textAlign: "left",
    textAlignVertical: "center",
    fontFamily: "Exo2-Bold",
    fontSize: 18,
  },
  formTitleCard: {
    color: textColor,
    textAlign: "left",
    textAlignVertical: "center",
    fontFamily: "Exo2-Bold",
    fontSize: 24,
  },
  exoTitle: {
    color: textColor,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Exo2-Bold",
    fontSize: 24,
  },
  // Globals Buttons
  buttonContainer: {
    gap: 4,
  },
  buttonStyle: {
    backgroundColor: mainColor,
    borderRadius: 50,
    padding: 10,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
    borderColor: mainColor,
    borderWidth: 2,
  },
  buttonCancelStyle: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderColor: "gray",
  },
  buttonStyleOutline: {
    backgroundColor: "#1E2423",
    borderRadius: 50,
    borderWidth: 2,
    padding: 10,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
    borderColor: "#aaaaaa",
  },
  buttonStyleDot: {
    backgroundColor: "black",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Exo2-Bold",
  },
  buttonCancelText: {
    color: "gray",
    fontSize: 24,
    fontFamily: "Exo2-Bold",
  },
  buttonLogoutStyle: {
    backgroundColor: mainColor,
    borderRadius: 50,
    padding: 10,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  buttonSelectorSelectedStyle: {
    backgroundColor: "#1E2423",
    borderWidth: 2,
    padding: 5,
    width: Dimensions.get("window").width * 0.45,
    alignItems: "center",
    borderColor: mainColor,
  },
  buttonSelectorStyle: {
    backgroundColor: "#1E2423",
    borderWidth: 2,
    padding: 5,
    width: Dimensions.get("window").width * 0.45,
    alignItems: "center",
    borderColor: "#aaaaaa",
  },
  //////////////////////////////// Networks Styles ///////////////////////////////
  network: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 60,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginVertical: 10,
  },
  networkMarginIcon: {
    marginHorizontal: 14,
  },
  networkTokenName: {
    fontSize: 16,
    color: textColor,
  },
  networkTokenData: {
    fontSize: 12,
    color: textColor,
  },
  // Send Styles
  input: {
    borderRadius: 5,
    width: "90%",
    borderColor: mainColor,
    borderWidth: 2,
    color: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 24,
    height: 60,
    marginBottom: 20,
    marginTop: 20,
  },
  inputPickerView: {
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.9,
    borderColor: mainColor,
    borderWidth: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    marginVertical: 20,
  },
  inputPicker: {
    width: Dimensions.get("window").width * 0.88,
    fontSize: 24,
  },
  inputChat: {
    borderRadius: 25,
    borderColor: mainColor,
    borderWidth: 2,
    marginTop: 20,
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
    padding: 12,
    textAlign: "justify",
    width: "66%",
    alignSelf: "flex-end",
  },
  // Modal
  singleModalButton: {
    backgroundColor: mainColor,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  singleModalButtonText: {
    fontSize: 24,
    color: textColor,
    marginVertical: 10,
  },
  // Savings Styles
  titleSaves: {
    fontSize: 18,
    color: "#fff",
    textAlignVertical: "center",
    fontFamily: "Exo2-Bold",
  },
});

export default GlobalStyles;
