import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { PrivyElements, PrivyProvider } from "@privy-io/expo";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
  arbitrum,
  avalanche,
  base,
  mainnet,
  optimism,
  polygon,
} from "viem/chains";
import TransactionsModal from "../components/transactionsModal";
import { ContextProvider } from "../utils/contextModule";
import { StatusBar } from "react-native";

export default function RootLayout() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  StatusBar.setBarStyle('dark-content');
  return (
    <ContextProvider>
      <PrivyProvider
        supportedChains={[
          mainnet,
          avalanche,
          polygon,
          arbitrum,
          optimism,
          base,
        ]}
        config={{
          appearance: {
            theme: "dark",
          },
          embedded: {
            ethereum: {
              createOnLogin: "users-without-wallets", // defaults to 'off'
            },
          },
        }}
        appId={Constants.expoConfig?.extra?.privyAppId}
        clientId={Constants.expoConfig?.extra?.privyClientId}
      >
        <TransactionsModal />
        <Stack
          screenOptions={{
            animation: "simple_push",
            headerShown: false,
          }}
        >
          {
            // Splash Loading Screen
          }
          <Stack.Screen name="index" />
          {
            // Setup Screen
          }
          <Stack.Screen name="(screens)/setup" />
          <Stack.Screen name="(screens)/main" />
          {
            // Chat Screen
          }
          <Stack.Screen name="(screens)/chat" />
          {
            // Send Screen
          }
          <Stack.Screen name="(screens)/send" />
        </Stack>
        <PrivyElements />
      </PrivyProvider>
    </ContextProvider>
  );
}
