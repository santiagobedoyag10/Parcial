import React from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation/>
    </NavigationContainer>
  );
}


