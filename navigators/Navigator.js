import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../view/Home';
import Profile from '../view/Profile';
import Single from '../view/Single';
import Login from '../view/Login';
import {MainContext} from '../context/MainContext';
import {Icon} from 'react-native-elements';
import ModifyUser from '../view/ModifyUser';
import Upload from '../view/Upload';
import MyFiles from '../view/MyFiles';
import Modify from '../view/Modify';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          headerTitleAlign: 'center',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
        component={Home}
      ></Tab.Screen>
      <Tab.Screen
        name="Upload"
        options={{
          tabBarLabel: 'Upload',
          headerTitleAlign: 'center',
          tabBarIcon: ({color}) => (
            <Icon name="backup" color={color} size={26} />
          ),
        }}
        component={Upload}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
        component={Profile}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabScreen}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Single"
            component={Single}
            options={{headerTitleAlign: 'center'}}
          ></Stack.Screen>
          <Stack.Screen
            name="Modify user"
            component={ModifyUser}
          ></Stack.Screen>
          <Stack.Screen name="My Files" component={MyFiles}></Stack.Screen>
          <Stack.Screen name="Modify" component={Modify}></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
