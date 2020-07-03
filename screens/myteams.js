import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    StatusBarStyle
} from "react-native";

import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import TeamCard from '../components/TeamCard.js'
//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
// teamDetails
// teamName
// image
// moreDetails

class Notification extends Component {

    static navigationOptions = {
        title : 'First Screen'
    }
    render() {
        var {navigate} = this.props.navigation;
        return (
            <View style = {{flex:1 , backgroundColor:'#000' , borderTopColor:'#00e676' , borderTopWidth:1}}>
                <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />
                <View style={{flexDirection:'row' , margin:20 , marginTop:20 , marginBottom:10, borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:'#424242'}}>
                    <Image 
                        source = {require('../assets/profile-pic.jpg')}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <Text style={{fontWeight:'bold', fontSize:17 , color:'#fff'}}>
                            Random Name
                        </Text>
                        <Text style = {{fontSize:15 , color:'#fff'}}>
                            wants to be your friend
                        </Text>
                    <View style = {{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
                        <View style ={{margin:10 , backgroundColor:'#00e676' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
                            <Text  style={{fontWeight:'bold', fontSize:17 ,color : "#fff"}}>
                                Accept
                            </Text>
                        </View>
                        <View style ={{margin:10 , backgroundColor:'#D3D3D3' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>
                                Ignore
                            </Text>
                        </View>
                    </View>
                    </View>
                </View>
                <View style={{flexDirection:'row' , margin:20 , marginTop:10,borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:'#424242'}}>
                    <Image 
                        source = {require('../assets/profile-pic.jpg')}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <Text style={{fontWeight:'bold', fontSize:17 , color:'#fff'}}>
                            Random Name
                        </Text>
                        <Text style = {{fontSize:15 , color:'#fff'}}>
                            invited you for random event
                        </Text>
                    <View style = {{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
                        <View style ={{margin:10 , backgroundColor:'#00e676' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
                            <Text  style={{fontWeight:'bold', fontSize:17 ,color : "#fff"}}>
                                Accept
                            </Text>
                        </View>
                        <View style ={{margin:10 , backgroundColor:'#D3D3D3' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>
                                Ignore
                            </Text>
                        </View>
                    </View>
                    </View>
                </View>
            </View>
            
        );
    }
}
export default Notification;

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