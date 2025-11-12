// Marino Teixeira Dos Santos Oliveira DEVELOPER

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import ListUsers from "./src/screens/ListUsers";
import UserForm from "./src/screens/UserForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="ListUsers" component={ListUsers} options={{ title: "Usuários" }} />
        <Stack.Screen name="UserForm" component={UserForm} options={{ title: "Cadastro de Usuário" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
