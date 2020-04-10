import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { View ,FlatList} from 'react-native';
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
            players:params.players
        })
    }
  render() {
      
    return (
      <Container>
        <Content>
          <List dataArray={this.state.players}
          renderRow={(item)=>
          <List>
              <Text>
              {item}
              </Text>
          </List>}/>
        </Content>
      </Container>
    );
  }
}