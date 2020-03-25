import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class create_event extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>create_event</Text>
            </View>
        );
    }
}
export default create_event;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});