import React,{ Component } from "react";
import {View ,StyleSheet} from 'react-native';
import AndroidFusedLocation from '../components/AndroidFusedLocation';
import BatchDetails from '../components/BatchDetails';
import ErrorBoundary from 'react-native-error-boundary'
export default class GeoLocation extends Component {
    //to do
    Fallback = () => (
        <View>
          <Text>Something happened!</Text>
          <Text>Please try after some time!</Text>
        </View>
      )
    render(){
        return(
            <View style={styles.wrapper}>
            <ErrorBoundary FallbackComponent={this.Fallback}>
            <BatchDetails navigation={this.props.navigation}/>
            <AndroidFusedLocation navigation={this.props.navigation}/>
            </ErrorBoundary>
        </View>
    )}
}
const styles = StyleSheet.create({
  wrapper: {
    margin : 20
  }});