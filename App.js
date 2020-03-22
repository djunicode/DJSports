import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignOutScreen from './src/screens/SignOutScreen'
<<<<<<< HEAD
import CreateEvent from './src/screens/CreateEvent'
import MyEvent from './src/screens/MyEvent'

=======
import SplashScreen from './src/screens/SplashScreen'
>>>>>>> e6b439310d954f6b98a444cada253212d61b53d6
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



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
<<<<<<< HEAD

export default createAppContainer(Signoutnav)
=======
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
>>>>>>> e6b439310d954f6b98a444cada253212d61b53d6
