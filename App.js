
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
import EventDetails from './screens/EventDetails'
import ProfileDetails from './screens/ProfileDetails'
import MyEvent from './src/screens/MyEvent'
import ProfileSearch from "./src/screens/ProfileSearch.js"
import SplashScreen from './src/screens/SplashScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import Showlist from './src/screens/ShowList';

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
  },
  ProfileDetails:{
    screen:ProfileDetails
  },
  ProfileSearch : {
    screen : ProfileSearch
  },
  
  initialRouteName : 'home'
})
const showeventpage=createStackNavigator({
  ShowEvent:{
    screen:ShowEvent
   },
   ShowList:{
     screen:Showlist
   }
 },
 {headerMode:'none'})
const event_main = createStackNavigator({
  /*event :{
    screen : event
  },*/
  MyEvent: {
    screen: MyEvent,
    navigationOptions: {
      title: 'MY EVENTS',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF'
      }

    }
    
  },
  create_event : {
    screen :create_event,
    navigationOptions: {
      title: 'CREATE  EVENT',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
        //fontFamily: 'Cambria',
    
      }

    }
  },
  
  EditEvent: {
    screen: EditEvent,
    navigationOptions: {
      title: 'EDIT EVENT',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }
  },

  ShowEvent: {
    screen: showeventpage,
    navigationOptions: {
      title: 'EVENT DETAILS',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: '#212121'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      },
      headerBackTitleStyle:{ backgroundColor: 'white', color:'white', tintColor:'white'},
      headerBackAllowFontScaling: true,
      headerBackImage: {color: 'white'}


    }
  },

  
  // create_team :{
  //   screen : create_team
  // },
  initialRouteName : 'MyEvent'

})//,{headerMode: "none"})

const teamModule = createStackNavigator({
  myteams :{
    screen : myteams,
    navigationOptions: {
      title: 'MY TEAMS',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }

  },
  team: {
    screen :team,
    navigationOptions: {
      title: 'TEAM DETAIL',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }

  },
  create_team :{
    screen : create_team,
    navigationOptions: {
      title: 'CREATE TEAM',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }

  },
  join_team : {
    screen : join_team,
    navigationOptions: {
      title: 'JOIN A TEAM',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }

  },
  select_player : {
    screen : select_player,
    navigationOptions: {
      title: 'SELECT PLAYERS',
      headerStyle: { height: 70, justifyContent: 'center', backgroundColor: 'black'},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }

    }

  },
  
  initialRouteName : 'myteams',
  

})
const Login = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen
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
  /*profile_search : {
    screen : ProfileSearch,
    navigationOptions: {title: 'Explore', tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={30} color="white" style = {{padding : 2}}/>
      )}
  },*/
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
  style: { backgroundColor: '#212121', },
  labelStyle: {fontSize:12,textTransform:'capitalize'},
  tabStyle:{height:60},
  iconStyle: {inactiveColor:'grey', paddingTop:3, activeColor: 'white'},
  indicatorStyle: { backgroundColor: '#00e676', height: 4}
  

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










