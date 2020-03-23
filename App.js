import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignOutScreen from './src/screens/SignOutScreen'
import SplashScreen from './src/screens/SplashScreen'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



const Main = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
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
const SplashNav = createSwitchNavigator(
  {
    SplashScreen:SplashScreen,
    Signoutnav:Signoutnav
  },
  {
    initialRouteName:'SplashScreen'
  }
)
export default createAppContainer(SplashNav)