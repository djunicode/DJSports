
import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createSwitchNavigator} from 'react-navigation-switch'
//import {createDrawerNavigator} from 'react-navigation-drawer';
import event from '/Users/apple/DJSports/screens/event.js'
import home from '/Users/apple/DJSports/screens/home.js'
import notifs from '/Users/apple/DJSports/screens/notifs.js'
import profile from '/Users/apple/DJSports/screens/profile.js'
import create_event from '/Users/apple/DJSports/screens/create_event.js'
import create_team from '/Users/apple/DJSports/screens/create_team.js'
import myteams from '/Users/apple/DJSports/screens/myteams.js'
import team from '/Users/apple/DJSports/screens/team.js'
import join_team from '/Users/apple/DJSports/screens/join_team.js'
import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignOutScreen from './src/screens/SignOutScreen'
import SplashScreen from './src/screens/SplashScreen'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


export default class App extends React.Component {
  
  render() {
    return (
          <AppContainer/> 
    );
  }
}
const event_main = createStackNavigator({
  event :{
    screen : event
  },
  create_event : {
    screen :create_event
  },
  // create_team :{
  //   screen : create_team
  // },
  initialRouteName : 'event'

})
const teamModule = createStackNavigator({
  myteams :{
    screen : myteams
  },
  team: {
    screen :team
  },
  create_team :{
    screen : create_team
  },
  join_team : {
    screen : join_team
  },
  
  initialRouteName : 'myteams'

})
const Base = createSwitchNavigator(
{
    Login : Login,
    Tabs : BottomNavigator
},
{
  initialRouteName : 'Tabs'
})
const Main  = createStackNavigator(
  {
       SplashNav : SplashNav,
       Base : Base

  }
) 

const Login = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
  },
  {
    initialRouteName: 'LoginScreen',
  }

);
// const Signoutnav = createSwitchNavigator(
//   {
//     Main : Main,
//     SignOut : SignOutScreen
//   }
// )
const SplashNav = createSwitchNavigator(
  {
    SplashScreen:SplashScreen,
    Signoutnav:Signoutnav
  },
  {
    initialRouteName:'SplashScreen'
  }
)
const BottomNavigator = createMaterialBottomTabNavigator({
 
  home : {
    screen : home
  },
  event_main :{
    screen :event_main
  },
  notifs : {
    screen : teamModule
  }

  ,profile : {
    screen: profile
  }},
  {
  initialRouteName : 'home',
  order : ['home','event_main','notifs','profile']
  }
)


const AppContainer = createAppContainer(Main)










