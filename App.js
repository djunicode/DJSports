
import React from 'react';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
//import {createDrawerNavigator} from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import event from './screens/event.js'
import home from './screens/home.js'
import notifs from './screens/notifs.js'
import profile from './screens/profile.js'
import create_event from './screens/create_event.js'
import create_team from './screens/create_team.js'
import myteams from './screens/myteams.js'
import team from './screens/team.js'
import join_team from './screens/join_team.js'
import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import EditEvent from './src/screens/EditEvent'
import ShowEvent from './src/screens/ShowEvent'
import MyEvent from './src/screens/MyEvent'
import EventDetails from './screens/EventDetails'

import SplashScreen from './src/screens/SplashScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import select_player from './screens/select_player.js'
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
const mainpage = createStackNavigator({
  home:{
    screen:home
  },
  details:{
    screen:EventDetails
  }
})
const event_main = createStackNavigator({
  /*event :{
    screen : event
  },*/
  MyEvent: {
    screen: MyEvent,
    
  },
  create_event : {
    screen :create_event,
  },
  
  EditEvent: {
    screen: EditEvent,
  },

  ShowEvent: {
    screen: ShowEvent,
  },
  
  // create_team :{
  //   screen : create_team
  // },
  initialRouteName : 'MyEvent'

},{headerMode: "none"})

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
  select_player : {
    screen : select_player
  },
  
  initialRouteName : 'myteams',
  

})
const Login = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
   
  },
  {
    initialRouteName: 'LoginScreen',
  }

);
/*const BottomNavigator = createMaterialBottomTabNavigator({
 
  home : {
    screen : mainpage,
    navigationOptions: {title: 'Home', tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color="white" />
      )}
  },
  event_main :{
    screen :event_main,
    navigationOptions: {title: 'My Events', tabBarIcon: ({ tintColor }) => (
      <Icon name="folder-open" size={21} color="white" />
      )}
  },
  notifs : {
    screen : teamModule,
    navigationOptions: {title: 'Notifications', tabBarIcon: ({ tintColor }) => (
      <Icon name="bell" size={25} color="white" />
      )}
  }

  ,profile : {
    screen: profile,
    navigationOptions: {title: 'Profile', tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={25} color="white" />
      )}
  }},
  {
  initialRouteName : 'home',
  order : ['home','event_main','notifs','profile'],
  activeTintColor: 'white',
    inactiveColor: '#9e9e9e',
    barStyle: { backgroundColor: '#1a237e' , }
  }
)*/

const BottomNavigator = createMaterialTopTabNavigator({
 
  home : {
    screen : mainpage,
    navigationOptions: {title: 'Home', tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color="white" />
      )},
  },
  event_main :{
    screen :event_main,
    navigationOptions: {title: 'My Events', tabBarIcon: ({ tintColor }) => (
      <Icon name="folder-open" size={21} color="white" />
      )}
  },
  notifs : {
    screen : teamModule,
    navigationOptions: {title: 'Notifications', tabBarIcon: ({ tintColor }) => (
      <Icon name="bell" size={25} color="white" />
      )}
  }

  ,profile : {
    screen: profile,
    navigationOptions: {title: 'Profile', tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={25} color="white" />
      )}
  }},
  {
  initialRouteName : 'home',
  tabBarPosition: 'bottom',
  tabBarOptions: {activeTintColor: 'white',
  inactiveColor: '#9e9e9e', showIcon: 'true',
  style: { backgroundColor: '#1a237e', },
  labelStyle: {fontSize:12,textTransform:'capitalize'},
  tabStyle:{height:58},
  iconStyle: {inactiveColor:'grey'},
  
},
  order : ['home','event_main','notifs','profile'],
  
  
  
    
  }
)

const Base = createSwitchNavigator(
{
    Login : Login,
    Tabs : BottomNavigator
},
{
  initialRouteName : 'Tabs'
},{headerMode:'none'})
const SplashNav = createSwitchNavigator(
  {
    SplashScreen:SplashScreen,
    Signoutnav:Login
  },
  {
    initialRouteName:'SplashScreen'
  }
)

const Main  = createSwitchNavigator(
  {
       SplashNav : SplashNav,
       Base : Base

  },
  {headerMode:'none'}
) 

const AppContainer = createAppContainer(Main)










