import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';  
import FusedLocation from 'react-native-fused-location';
import {View, Text, StyleSheet, Button} from 'react-native';
import {POSTGEOLOCATION} from '../restapi/GeoLocation';
import { save, get, remove,update , ACTION,STORAGEKEYS,removeFromArray } from '../store/AsyncStorage';
import { Fetch } from '../utils/FetchApi';
const  batchGeoLocation ={};
const  locationArray =[];
let batchLocationKey='';
export default class AndroidFusedLocation extends Component {
    constructor(props){
        super(props)
        this.state ={
            locationAction:{
                isLocationReceived:false,
                isLocationEnded:false
        },
        isErrorOccured : false,
        isOffline : false
    }
}
async componentDidMount() {
    batchGeoLocation.BatchId = this.props.navigation.state.params.BatchId;
    batchLocationKey=`${STORAGEKEYS.INDIVIDUALBATCHLOCATION}${batchGeoLocation.BatchId}`;
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
        await save(batchLocationKey,locationArray);
       this.setState({locationAction:{isLocationReceived:true}});
       }
       else{
        this.setState({isErrorOccured:true});
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
       this.syncGeoLocation(location,ACTION.UPDATE,batchLocationKey);
       });
       this.errSubscription = FusedLocation.on('fusedLocationError', error => {
           //show alert
           console.log(error);
       });
    }
    else{
        this.setState({isErrorOccured:true})
    }
}
componentWillUnmount() {
    FusedLocation.off(this.subscription);
    FusedLocation.off(this.errSubscription);
    FusedLocation.stopLocationUpdates();
}
endFusedLocation = async() =>{
    let batchStorageKey=`${STORAGEKEYS.BATCHLOCATION}${batchGeoLocation.BatchId}`;
    batchGeoLocation.GeoLocation = await this.syncGeoLocation(null,ACTION.GET,batchLocationKey);
     //remove current batch location
     await this.syncGeoLocation(null,ACTION.REMOVE,batchLocationKey);
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
    //handle critical cases
    await this.syncGeoLocation(null,ACTION.REMOVE,batchStorageKey);

    this.setState({locationAction:{isLocationEnded:true}});
    }
    catch(err){
    //store the data
    await this.syncGeoLocation(batchGeoLocation,ACTION.SAVE,batchStorageKey);
    //store batch id for sync
    let response =await this.syncGeoLocation(null,ACTION.GET,STORAGEKEYS.BATCHTOBESYNC);
    let index = false;
    if(response){
        for(let i=0;i<response.length;i++){
            if(response[i]===batchGeoLocation.BatchId){
                index=true;
            }
        }
    }
    if(!index){
    await update(STORAGEKEYS.BATCHTOBESYNC,batchGeoLocation.BatchId);
    }
        this.setState({
            isOffline:true,
            locationAction:{isLocationEnded:true}
        });
    }
}
syncGeoLocation = async(location,actionType,key) =>{
    //store location
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
        case ACTION.REMOVEFROMARRAY :
            return await removeFromArray(key,batchGeoLocation.BatchId)
     }
}
getMessage = () =>{
    let message={};
    if(this.state.locationAction.isLocationEnded && this.state.isOffline){
        message.Text='Location ended !! It seems your are offline. Location has been saved in your device please sync the data later!!';
        message.Style=styles.offlineMessage;
    }
    else if(this.state.locationAction.isLocationReceived){
        message.Text='Location getting ...';
        message.Style=styles.locationStart;
    }
    else if(this.state.locationAction.isLocationEnded){
        message.Text='Location ended !! You have successfully sent the data to Aibono server ';
        message.Style=styles.locationEnd;
    }
    else if(this.state.isErrorOccured){
        message.Text='Location not granted or something went wrong!!';
        message.Style=styles.error
    }
    return message;
}
render(){
    let messaage=this.getMessage();
    return(
        <View>
            <Text style = {messaage.Style}>
            {messaage.Text}
            </Text>
            {this.state.locationAction.isLocationReceived &&
            <View>
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
    locationStart :{
        textAlign: 'center',
        color: 'green',
      fontSize: 20
    },
    locationEnd :{
        textAlign: 'center',
        color: 'green',
      fontSize: 20
    },
    offlineMessage :{
        textAlign: 'center',
        color: '#191970',
      fontSize: 20
    },
    error :{
        textAlign: 'center',
        color: 'red',
      fontSize: 20
    }
  });