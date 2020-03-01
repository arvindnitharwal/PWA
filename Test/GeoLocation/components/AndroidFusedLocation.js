import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';  
import FusedLocation from 'react-native-fused-location';
import {View, Text, StyleSheet, Button} from 'react-native';
import {POSTGEOLOCATION} from '../restapi/GeoLocation';
import { save, get, remove,update , ACTION,STORAGEKEYS } from '../store/AsyncStorage';
import { Fetch } from '../utils/FetchApi';
const  batchGeoLocation ={};
const  locationArray =[];
export default class AndroidFusedLocation extends Component {
    constructor(props){
        super(props)
        this.state ={
            locationAction:{
                isLocationReceived:false,
                isLocationEnded:false
        },
        isErrorOccured : false
    }
}
async componentDidMount() {
    batchGeoLocation.BatchId = this.props.navigation.state.params.BatchId;
    const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                       title: 'Aibono needs to access your location',
                       }
                   );
    if (granted) {
       FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
       //first location
       const location = await FusedLocation.getFusedLocation();
       if(location && location.latitude){
        let firstLocation = {
            accuracy : location.accuracy,
            altitude:location.altitude,
            latitude:location.latitude,
            longitude:location.longitude
         }
        locationArray.push(firstLocation);
        await save(batchGeoLocation.BatchId.toString(),locationArray);
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
         //update location
       this.syncGeoLocation(location,ACTION.UPDATE,batchGeoLocation.BatchId);
       });
       this.errSubscription = FusedLocation.on('fusedLocationError', error => {
           //show alert
           console.log(error);
       });
    }
}
componentWillUnmount() {
    FusedLocation.off(this.subscription);
    FusedLocation.off(this.errSubscription);
    FusedLocation.stopLocationUpdates();
}
endFusedLocation = async() =>{
    let currentBatchLocation = await this.syncGeoLocation(null,ACTION.GET,batchGeoLocation.BatchId);
    batchGeoLocation.GeoLocation=JSON.parse(currentBatchLocation);
     //remove current batch location
     await this.syncGeoLocation(null,ACTION.REMOVE,batchGeoLocation.BatchId);
    try{
    FusedLocation.off(this.subscription);
    FusedLocation.off(this.errSubscription);
    FusedLocation.stopLocationUpdates();
    let request ={};
    request.url = POSTGEOLOCATION;
    request.method="POST";
    request.isAuthorized=true;
    request.body=currentBatchLocation;
    await Fetch(request);
    this.setState({locationAction:{isLocationEnded:true}});
    }
    catch(err){
    //store the data
    let batchStorageKey=`${STORAGEKEYS.BATCHLOCATION}${batchGeoLocation.BatchId}`;
    console.log(batchGeoLocation);
    await this.syncGeoLocation(batchGeoLocation,ACTION.SAVE,batchStorageKey);
    await this.syncGeoLocation(batchGeoLocation.BatchId,ACTION.UPDATE,STORAGEKEYS.BATCHTOBESYNC);
        this.setState({
            isErrorOccured:true,
            locationAction:{isLocationEnded:true}
        });
    }
}
syncGeoLocation = async(location,actionType,key) =>{
    //store location
    key = key.toString();
    let geoLocation ={};
    if(location){
    geoLocation = {
        accuracy : location.accuracy,
        altitude:location.altitude,
        latitude:location.latitude,
        longitude:location.longitude
     }
    }
     switch(actionType){
         case ACTION.SAVE :
            return await save(key,geoLocation);
        case ACTION.UPDATE :
            return await update(key,geoLocation);
        case ACTION.REMOVE :
            return await remove(key);
        case ACTION.GET :
            return await get(key);
     }
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