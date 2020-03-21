import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class create_team extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>create_team</Text>
            </View>
        );
    }
}
export default create_team;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});