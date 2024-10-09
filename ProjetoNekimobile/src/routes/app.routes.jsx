import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from '../screens/Home'

const AppStack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
