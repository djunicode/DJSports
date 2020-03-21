
import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

//import {createDrawerNavigator} from 'react-navigation-drawer';
import event from './screens/event.js'
import home from './screens/home.js'
import notifs from './screens/notifs.js'
import profile from './screens/profile.js'
import create_event from './screens/create_event.js'
import create_team from './screens/create_team.js'





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
  create_team :{
    screen : create_team
  },
  initialRouteName : 'event'

})
const BottomNavigator = createMaterialBottomTabNavigator({

  home : {
    screen : home
  },
  event_main :{
    screen :event_main
  },
  notifs : {
    screen : notifs
  }

  ,profile : {
    screen: profile
  }},
  {
  initialRouteName : 'home',
  order : ['home','event_main','notifs','profile']
  }
)

const AppContainer = createAppContainer(BottomNavigator)
