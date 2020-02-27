import React,{ PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
export default class BatchDetails extends PureComponent {
    render(){
        return(
        <Text style={styles.baseText}>
        <Text style={styles.titleText}>
        F1_Basil_Italian_2019 {'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
        You also lose the ability to set up a default font for an entire subtree.
        Meanwhile, fontFamily only accepts a single font name, which is different from font-family in CSS.
        </Text>
      </Text>
        )
    }
}
const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
      marginVertical: 20,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
