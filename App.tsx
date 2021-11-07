import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import { ApolloClient } from "@apollo/client";
import { ThemeProvider } from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { ApolloProvider } from "@apollo/client";
import { theme } from "./styles";
import { NavController } from "./components/NavController";
import { AuthProvider } from "./context/AuthContext";
import { setContext } from "@apollo/client/link/context";

const apiUrl = process.env.API_URI;

const cache = new InMemoryCache();

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  const [client, setClient] =
    useState<null | ApolloClient<NormalizedCacheObject>>(null);

  const preload = async (): Promise<void> => {
    try {
      await Font.loadAsync({ ...Ionicons.font });
      await Asset.loadAsync(require("./assets/iconLogo.svg"));
      await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
      });

      const httpLink = createHttpLink({ uri: apiUrl });

      const authLink = setContext(async (_, { headers }) => {
        const token = await AsyncStorage.getItem("jwt");

        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      const client = new ApolloClient({
        cache,
        link: authLink.concat(httpLink),
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      setIsLoggedIn(isLoggedIn === "true" ? true : false);

      setClient(client);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  if (loaded && client && isLoggedIn !== null) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider isLoggedIn={isLoggedIn}>
            <StatusBar style="auto" />
            <NavController></NavController>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }

  return <AppLoading></AppLoading>;
}
