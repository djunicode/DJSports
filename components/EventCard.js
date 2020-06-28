import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Container, Header, Body, CheckBox, Title, Card, CardItem, Left, Right, Content, Thumbnail, Grid, Button, Subtitle } from 'native-base'

class EventCard extends Component {
    render() {
        console.disableYellowBox = true
        return (
            <Content style={{ padding: 5 }}>
                <Card style={{ alignContent: 'center', height: 117, borderRadius: 5, marginBottom: 0 , backgroundColor:'black',borderColor:'black'}}>

                    <CardItem style = {{backgroundColor:'black'}}>
                        <Left>
                            <View>
                                <Title style={{ color: 'white', paddingStart: 20 }}>
                                    {this.props.EventName}
                                </Title>
                                <Subtitle style={{ color: 'white', paddingStart: 20, paddingTop: 5, fontSize: 15 }}>
                                    {this.props.Sport}
                                </Subtitle>
                            </View>
                        </Left>
                    </CardItem>
                    <CardItem style={{ backgroundColor: '#00e676',borderBottomRadius: 5, height: 40}}>
                        <Left style={{ paddingLeft: 10, marginLeft: 10 ,borderRadius: 5}}>
                            <Text >Where: {this.props.place}</Text>
                        </Left>
                        <Right style={{ paddingRight: 0 }}>
                            <Text style={{ fontSize: 15 }}>On: {this.props.Date}</Text>
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