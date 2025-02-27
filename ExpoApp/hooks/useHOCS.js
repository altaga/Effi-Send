import {
  useEmbeddedWallet,
  useFundWallet,
  useLogin,
  usePrivy,
} from "@privy-io/expo";
import { useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React from "react";

export const useHOCS = (Component) => {
  return (props) => {
    const [focus, setFocus] = React.useState(false);
    useFocusEffect(
      React.useCallback(() => {
        setFocus(true);
        return () => {
          setFocus(false);
        };
      }, [])
    );
    const privy = usePrivy();
    
    const user = privy.user;
    const { fundWallet } = useFundWallet();
    //const account = getUserEmbeddedEthereumWallet(user);
    const wallet = useEmbeddedWallet();
    const { login } = useLogin();
    const glob = useGlobalSearchParams();
    const local = useLocalSearchParams();
    return (
      <Component
        glob={glob}
        local={local}
        privy={privy}
        user={user}
        wallet={wallet}
        login={login}
        fundWallet={fundWallet}
        focus={focus}
        {...props}
      />
    );
  };
};
