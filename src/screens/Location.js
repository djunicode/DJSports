import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class Location extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            text: '',
        }
    }

    getData = async (text) => {
        if (text.length > 3) {
            const response = await fetch('https://autosuggest.search.hereapi.com/v1/autosuggest?at=19.0760,72.8777&limit=20&q='+text+'&apiKey=fQJs0PSSbhmAyaxhDboKx7RvThmIeQhgoFIHuf3JpLA')
            const result = await response.json()
            //console.log(result)
            const results = result.items
            this.state.data = []
            results.map((item) => {
                this.state.data.push({
                    title: item.title,
                    completeAddress: item.address.label,
                    long_lat: item.position,
                    zipCode : item.address.postalCode
                })
            })
        }else{
            this.state.data = []
        }
        this.setState({
            data : this.state.data
        })
    }
    storeadd = async (item) =>{
        //console.log(item)
        const loc = JSON.stringify(item)
        await AsyncStorage.setItem('Location' , loc)
        this.props.navigation.navigate('create_event')
    }

    render() {
        return (
            <View style={style.container}>

                <View style={{ flexDirection: 'column', borderWidth: 1, marginLeft: 20, marginRight: 20, borderColor: 'grey', borderRadius: 10, marginTop: 20 }}>
                    <TextInput
                        keyboardType={'ascii-capable'}
                        placeholder='Add your Location'
                        onChangeText={(text) => this.getData(text)}
                        style={style.textinput}

                    >
                    </TextInput>
                </View>

                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity style={{ marginVertical:10}} onPress = {() => this.storeadd(item)}>
                                <View style={{ padding: 0, borderBottomWidth: 1, marginHorizontal: 15, borderColor: '#e0e0e0' , }} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Text style={{ fontSize: 20,fontWeight:'bold',color:'#fff'  }}>{item.completeAddress}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        }
                        keyExtractor={(item, index) => index.toString()
                        }
                    />
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },

    text: {
        fontSize: 25,
        borderRightWidth: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        borderColor: 'grey',
        color:'#fff'
    },
    textinput: {
        fontSize: 25,
        paddingLeft: 10,
        color:'#fff'

    },
    button: {
        fontSize: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        color: 'white'

    },
})
