import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";

import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import TeamCard from '../components/TeamCard.js'
//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
// teamDetails
// teamName
// image
// moreDetails

class myteams extends Component {

    static navigationOptions = {
        title : 'First Screen'
    }
    render() {
        var {navigate} = this.props.navigation;
        return (
            <View>
              {/* <Header style = {{backgroundColor: 'blue'}}/> */}
                {/* Leave header for now */}
                <View style = {{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', marginTop: 20}}>
                    <TouchableOpacity style = {styles.button2} onPress  = {
                    ()=>navigate('create_team')}>
                        <Text style = {{color: 'black', fontSize:20, padding:10}}>CREATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button2} onPress  = {
                    ()=>navigate('join_team')}>
                        <Text style = {{color: 'black', fontSize:20, padding:10}}>JOIN</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
         
          scrollEnabled={true}
        
          data=
          {[{teamDetail : 'Team is really Good',
            teamName : 'Team1',
            moreDetail:'Fantastic',
            image : '../assets/media2.jpg'
            },
            {teamDetail : 'Team is really Good',
            teamName : 'Team2',
            moreDetail:'Fantastic',
            image :'../assets/media2.jpg'
            },{teamDetail : 'Team is really Good',
            teamName : 'Team3',
            moreDetail:'Fantastic',
            image :'../assets/media2.jpg'
            },{teamDetail : 'Team is really Good',
            teamName : 'Team1',
            moreDetail:'Fantastic',
            image : '../assets/media2.jpg'
            },
            {teamDetail : 'Team is really Good',
            teamName : 'Team2',
            moreDetail:'Fantastic',
            image : '../assets/media2.jpg'
            },{teamDetail : 'Team is really Good',
            teamName : 'Team3',
            moreDetail:'Fantastic',
            image :'../assets/media2.jpg'
            }
            // the above format should be followed for using the flat list
        
        ]}

          renderItem={({ item }) => 
          <TouchableOpacity onPress = {
              ()=>navigate("team",{item})
          }>
        <TeamCard image  = {require('../assets/media2.jpg')}
          teamDetails = {item.teamDetail}
          teamName = {item.teamName}
          moreDetails = {item.moreDetail}
        >
      </TeamCard>
      </TouchableOpacity>
      }
          //keyExtractor={item => item.teamName}
        />
           
            </View>
            
        );
    }
}
export default myteams;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 9,
       // height: 32,
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,


    },
});

/*<TouchableOpacity style = {{alignSelf : 'center'}}
                onPress  = {
                    ()=>navigate('create_team')}>
                   <Card style = {{width : 300,height : 50}}>
                       <CardItem style = {{alignContent : 'center'}}>
                           
                           <Title style = {{color : 'black'}}>Create Team</Title>
                        </CardItem>
                   </Card>
                </TouchableOpacity>
                <TouchableOpacity style = {{alignSelf : 'center'}}
                onPress  = {
                    ()=>navigate('join_team')}
                >
                   <Card style = {{width : 300,height : 50}}>
                       <CardItem style = {{alignContent : 'center'}}>
                           
                           <Title style = {{color : 'black'}}>Join Team</Title>
                        </CardItem>
                   </Card>
                </TouchableOpacity>*/