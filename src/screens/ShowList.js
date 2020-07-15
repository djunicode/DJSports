import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { View ,FlatList, StyleSheet} from 'react-native';

Array.prototype.unique = function () {
  return Array.from(new Set(this));
}

export default class ListExample extends Component {
    constructor(props) {
        super(props);
        this.state={
            players:[]

        }
    }

    componentDidMount(){
        var {params} = this.props.navigation.state
        console.log(params.players)
        this.setState({
            players:params.players.unique()
        })
    }
  render() {
      
    return (
      <Container style = {styles.container}>
        <Content>
    <Text style = {styles.header}>PLAYERS ({this.state.players.length})</Text>
          <List dataArray={this.state.players}
          renderRow={(item)=>
          <List>
              <Text style = {styles.name}>
              {item}
              </Text>
          </List>}/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black'
  },
  name: {
    fontSize:20,
    fontFamily:'Roboto-Light',
    color:'white',
    padding:13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:'#424242'
  },
  header: {
    fontSize: 30,
    color: '#ababab',
    alignSelf: 'center',
    padding: 20
  }
})