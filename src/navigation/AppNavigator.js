import * as React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../constants/colors'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused,color,size})=><AntDesign name='home' size={20} color={color} />
    }} />
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarIcon:({focused,color,size})=><AntDesign name='setting' size={20} color={color} />
    }} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'}/>
      <RootStack />
    </NavigationContainer>
  );
}