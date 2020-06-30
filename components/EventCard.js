import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,UIManager
} from "react-native";
import { Container, Header, Body, CheckBox, Title, Card, CardItem, Left, Right, Content, Thumbnail, Grid, Button, Subtitle } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    render() {
        console.disableYellowBox = true
        return (
            <Content style={{ padding: 3 }}>
                <Card style={{ alignContent: 'center', borderRadius: 5, marginBottom: 0, backgroundColor: 'black', borderColor: 'black', elevation: 9 }}>

                    <CardItem style={{ backgroundColor: 'black', paddingTop: 10 }}>
                        <Left>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                
                                    <View style = {{ flexDirection:'column'}}>
                                        <Title style={{ color: 'white', fontFamily: 'FiraSansCondensed-Regular', fontSize: 23, textTransform: "capitalize" }}>
                                            {this.props.EventName}
                                        </Title>
                                    </View>
                                    
                                
                                <Subtitle style={{ color: 'white', paddingStart: 20, paddingTop: 5, fontSize: 14, fontFamily: "SpaceMono-Regular", textTransform: 'uppercase' }}>
                                    {this.props.Sport}
                                </Subtitle>
                            </View>
                            <View style = {{flexDirection:'column'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                                this.setState({ expanded: !this.state.expanded })
                                            }}>
                                                {(!this.state.expanded)?
                                            <Icon style = {{padding: 8}}
                                                name="angle-down"
                                                size={25}
                                                color="#00e676"
                                            />:
                                            <Icon style = {{padding: 8}}
                                                name="angle-up"
                                                size={25}
                                                color="#00e676"
                                            />}
                                        </TouchableOpacity>
                                </View>
                                </View>
                        </Left>
                    </CardItem>


                </Card>
                <Card style={{ flex: 1, overflow: 'hidden' }}>
                    {this.state.expanded &&
                        <CardItem style={{ backgroundColor: '#00e676', borderBottomRadius: 5, height: 45 }}>
                            <Left style={{ paddingLeft: 0, borderRadius: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                            <Icon style = {{padding:1}}
                                                name="map-marker"
                                                size={19}
                                                color="#000"
                                            />
                                <Text style={{ fontSize: 15 , fontFamily: 'FiraSansCondensed-Regular'}}>  {this.props.place}</Text>
                            </View>
                            </Left>
                            <Right style={{ paddingRight: 0 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignContent:'center', justifyContent:"center"}}>
                            <Icon style = {{padding:1}}
                                                name="calendar"
                                                size={18}
                                                color="#000"
                                            />
                                <Text style={{ fontSize: 16 , fontFamily: 'FiraSansCondensed-Regular'}}>  {this.props.Date}</Text>
                            </View>
                            </Right>
                        </CardItem>
                    }
                </Card>

            </Content>)
    }
}
export default EventCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
});