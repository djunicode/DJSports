import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class event extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>event</Text>
            </View>
        );
    }
}
export default event;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});