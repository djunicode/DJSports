import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'

// teamDetails
// teamName
// image
// moreDetails

class TeamCard extends Component {
    render() {
        return (
            // <Container style = {{backgroundColor : '#efefef'}}>
            // <Header style = {{backgroundColor: 'blue'}}/>
            <Content>
                <Card style = {{alignContent : 'center'}}>
                    
                <CardItem header>
                    {/* <Text style = {{fontWeight : 'bold',}}>Team 1</Text> */}
                    <Left>
                    <Thumbnail source ={this.props.image}>
                        
                    </Thumbnail>
                    <View>
                        <Title style ={{color : 'black',paddingStart : 20}}>
                            {this.props.teamName}
                        </Title>
                        <Subtitle style ={{color : 'black',paddingStart : 20}}>
                            {this.props.teamDetails}
                        </Subtitle>
                    </View>
                    </Left>
                    
                    
                  </CardItem>
                <CardItem>
                    
                    <Left>
                    <Text>{this.props.moreDetails}</Text>
                    </Left>
                    <Right>
                       {/* Keeping Right empty for now  */}
                    </Right>
                </CardItem>
                
                </Card>
                
            </Content>)
        // </Container>)
    }
}
export default TeamCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});