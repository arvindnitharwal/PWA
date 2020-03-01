import React,{ PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
export default class BatchDetails extends PureComponent {
  constructor(props){
    super(props)
  }
    render(){
        return(
        <Text style={styles.baseText}>
        <Text style={styles.titleText}>
        {this.props.navigation.state.params.BatchName} {'\n'}{'\n'}
        </Text>
        <Text>
        Location will update in each 5 second.Please keep walking around the field. {'\n'}
        
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
