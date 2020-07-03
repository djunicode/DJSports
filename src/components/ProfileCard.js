import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,StatusBar,StatusBarStyle
} from "react-native";
import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

class ProfileCard extends Component {
    render() {
        console.disableYellowBox = true
        return (
            <View style = {{flex:1 , backgroundColor:'#000' }}>
                <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />
                <View style={{flexDirection:'row' , margin:20 , marginTop:20 , marginBottom:10, borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor:'#424242'}}>
                    <Image 
                        source = {this.props.image}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <View style = {{flexDirection: 'column'}}>
                        <Text style={{fontWeight:'bold', fontSize:17 , color:'#fff'}}>
                            {this.props.Name}
                        </Text>
                        <Text style = {{fontSize:14 , color:'#fff', fontFamily: 'SpaceMono-Regular', textTransform: 'uppercase', padding:3}}>
                            {this.props.Branch} {this.props.Year}
                        </Text>
                        <View style = {{flexDirection: 'row', padding: 2}}>
                            <Text style = {{color: '#ababab'}}>{this.props.Sports[0]}</Text>
                            <Text style = {{color: '#ababab'}}>   {this.props.Sports[1]}</Text>
                            <Text style = {{color: '#ababab'}}>   {this.props.Sports[2]}</Text>
                        </View>
                        </View>
                        <View style ={{margin:10 , backgroundColor:'#00e676' , padding:8 ,width:180, justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
                            <TouchableOpacity>
                                <Text  style={{fontWeight:'bold', fontSize:17 ,color : "#fff"}}>
                                    Add to Favourites
                                </Text>
                            </TouchableOpacity>
                        </View>
                  
                    </View>
                    
                    
                    
                </View>
            </View>
            )
    }
}
export default ProfileCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
});

/*<View style={{flexDirection:'row' , margin:20 , marginTop:20 , marginBottom:10, borderBottomWidth: StyleSheet.hairlineWidth,
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
                */


    /* 
    <Content style={{padding:5}}>
                <Card style = {{alignContent : 'center',height:125}}>
                
                <CardItem >
                <Left>
                    
                    <Thumbnail source ={this.props.image}>
                        
                    </Thumbnail>
               
                    <View>
                        <Title style ={{color : 'black',paddingStart : 20}}>
                            {this.props.Name}
                        </Title>
                        <Subtitle style ={{color : 'black',paddingStart : 20,paddingTop:10,fontSize:15}}>
                            {this.props.Branch} - {this.props.Year}
                        </Subtitle>
                        
                        <Subtitle style ={{color : 'black',paddingStart : 20,paddingTop:10,fontSize:15}}>
                        
                        { this.props.Sports.map((item, key)=>(
                        <Text key={key} style={styles.TextStyle}>{item} </Text>)
                        )}
                        </Subtitle>
                    </View>
                    </Left>                    
                </CardItem>
                
                </Card>
                
            </Content>
            */