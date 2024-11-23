import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionList from '@screens/transaction-list';
import TransactionDetail from '@screens/transaction-detail';

function StackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={TransactionList} />
        <Stack.Screen
          name="TransactionDetail"
          options={{
            headerShown: true,
            title: 'Detail Transaksi',
            headerBackTitle: '',
            headerShadowVisible: false,
          }}
          component={TransactionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
