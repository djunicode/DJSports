import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
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
            <View style = {{flex:1 , backgroundColor:'#fff'}}>
                <Text>Notification Screen</Text>
                <View style={{flexDirection:'row' , margin:20 , marginTop:10 , marginBottom:10}}>
                    <Image 
                        source = {require('../assets/profile-pic.jpg')}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <Text style={{fontWeight:'bold', fontSize:17}}>
                            Random Name
                        </Text>
                        <Text style = {{fontSize:15}}>
                            wants to be your friend
                        </Text>
                    <View style = {{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
                        <View style ={{margin:10 , backgroundColor:'blue' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
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
                <View style={{flexDirection:'row' , margin:20 , marginTop:10}}>
                    <Image 
                        source = {require('../assets/profile-pic.jpg')}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <Text style={{fontWeight:'bold', fontSize:17}}>
                            Random Name
                        </Text>
                        <Text style = {{fontSize:15}}>
                            invited you for random event
                        </Text>
                    <View style = {{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
                        <View style ={{margin:10 , backgroundColor:'blue' , padding:8 , width:100 , justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
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
    }
});