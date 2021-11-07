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
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { ApolloProvider } from "@apollo/client";
import { theme } from "./styles";
import { NavController } from "./components/NavController";
import { AuthProvider } from "./context/AuthContext";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const apiUrl = process.env.API_URI || "";
const wsUrl = process.env.WS_URI || "";

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: apiUrl,
});

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

      const authLink = setContext(async (_, { headers }) => {
        const token = await AsyncStorage.getItem("jwt");

        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      );

      const client = new ApolloClient({
        cache,
        link: authLink.concat(splitLink),
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
