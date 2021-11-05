import React, { createContext, useContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface ContextProps {
  isLoggedIn: boolean;
  logUserIn: (token: string) => Promise<void>;
  logUserOut: () => Promise<void>;
}

export const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  logUserIn: async (token: string) => {},
  logUserOut: async () => {},
});

interface AuthProviderProps {
  isLoggedIn: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isLoggedIn: defaultLoggedIn,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(defaultLoggedIn);

  const logUserIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("jwt");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // logUserOut();

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthorization = () => {
  return useContext(AuthContext);
};
