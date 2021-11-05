import React from "react";
import { useAuthorization } from "../../context/AuthContext";

import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "../../navigation/AuthNavigation";
import { MainNavigation } from "../../navigation/MainNavigation";

export const NavController = () => {
  const { isLoggedIn } = useAuthorization();

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
