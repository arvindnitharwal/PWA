import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';  
import FusedLocation from 'react-native-fused-location';
import {View, Text, StyleSheet, Button} from 'react-native';
export default class AndroidFusedLocation extends Component {
state ={
    locationAction:{
        isLocationReceived:false,
        isLocationEnded:false
    },
}
async componentDidMount() {
    const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                       title: 'Aibono needs to access your location',
                       }
                   );
    if (granted) {
       FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
       const location = await FusedLocation.getFusedLocation();
       if(location && location.latitude){
       this.setState({locationAction:{isLocationReceived:true}});
       }
       // Set options.
       FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
       FusedLocation.setLocationInterval(5000);
       FusedLocation.setFastestLocationInterval(5000);
       // Keep getting updated location.
       FusedLocation.startLocationUpdates();

       // Place listeners.
       this.subscription = FusedLocation.on('fusedLocation', location => {
         console.log(location);
       });
       this.errSubscription = FusedLocation.on('fusedLocationError', error => {
           console.log(error);
       });
    }
}
componentWillUnmount() {
    FusedLocation.off(this.subscription);
    FusedLocation.off(this.errSubscription);
    FusedLocation.stopLocationUpdates();
}
endFusedLocation = () =>{
    FusedLocation.off(this.subscription);
    FusedLocation.off(this.errSubscription);
    FusedLocation.stopLocationUpdates();
    this.setState({locationAction:{isLocationEnded:true}});
}
render(){
    return(
        <View>
            <Text>
                {this.state.locationAction.isLocationEnded ?"Location ended" : (this.state.locationAction.isLocationReceived ? "Location getting ...":"Something went wrong!")}
            </Text>
           {!this.state.locationAction.isLocationEnded && this.state.locationAction.isLocationReceived && <View>
            <Text style={styles.title}>
            Click on End button to End the location.
            </Text>
           <Button
            title="End"
            onPress={() => this.endFusedLocation()}
          />
        </View>}
      </View>
)}
}
const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
  });