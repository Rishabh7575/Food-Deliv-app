import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuScreen from './src/MenuScreen';
import CartScreen from './src/CartScreen';
import OrderSummaryScreen from './src/OrderSummaryScreen';

import { RootStackParamList } from './src/type'; // Ensure this path is correct

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
