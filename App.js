import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignOutScreen from './src/screens/SignOutScreen'
import CreateEvent from './src/screens/CreateEvent'
import MyEvent from './src/screens/MyEvent'

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

const Main = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
    CreateEvent: CreateEvent,
    MyEvent: MyEvent,
   
  },
  {
    initialRouteName: 'LoginScreen',
  }
);
const Signoutnav = createSwitchNavigator(
  {
    Main : Main,
    SignOut : SignOutScreen
  }
)

export default createAppContainer(Signoutnav)