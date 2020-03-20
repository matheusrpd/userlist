import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#24292E',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
    </Stack.Navigator>
  );
}
