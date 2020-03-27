import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'

class EventCard extends Component {
    render() {
        return (
            <Content style={{padding:5}}>
                <Card style = {{alignContent : 'center',height:125}}>
                    
                <CardItem >
                    <Left>
                    <View>
                        <Title style ={{color : 'black',paddingStart : 20}}>
                            {this.props.EventName}
                        </Title>
                        <Subtitle style ={{color : 'black',paddingStart : 20,paddingTop:10,fontSize:15}}>
                            {this.props.Sport}
                        </Subtitle>
                    </View>
                    </Left>                    
                </CardItem>
                <CardItem style={{backgroundColor:'#a6a6a6'}}>                    
                    <Left style={{paddingLeft:20}}>
                    <Text >Where: {this.props.place}</Text>   
                    </Left>
                    <Right style={{paddingRight:20}}>
                    <Text style={{fontSize:15}}>On: {this.props.Date}</Text>
                    </Right>
                </CardItem>
                </Card>
                
            </Content>)
    }
}
export default EventCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});