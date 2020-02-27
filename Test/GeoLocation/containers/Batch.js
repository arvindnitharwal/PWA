import React ,{ Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
export default class Batch extends Component {
render(){
    return (
        <View>
            <AppHeader/>
            {/* list of batches */}
        <Text style={styles.title}>
            Click on Start button to Start the location.
            </Text>
                <Button
                title="GetLocation"
                color="#008000"
                onPress={() =>
                    this.props.navigation.navigate('GeoLocation',{BatchId:1})
                  }
            />
        </View>
    )
}
}
const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
  });