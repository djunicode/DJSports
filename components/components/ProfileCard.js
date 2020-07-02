import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'

class ProfileCard extends Component {
    render() {
        console.disableYellowBox = true
        return (
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
                
            </Content>)
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