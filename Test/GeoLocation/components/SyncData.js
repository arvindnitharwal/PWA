import React, { useState, useEffect } from "react";
import { Fetch } from '../utils/FetchApi';
import { get, STORAGEKEYS, remove, removeFromArray} from '../store/AsyncStorage';
import {View, Text, StyleSheet, Button , Alert} from 'react-native';
import {POSTGEOLOCATION} from '../restapi/GeoLocation';
export default function SyncData(){
    const [batchList ,setBatchList]=useState([])
    const [syncText ,setsyncText]=useState('Sync Now')
    useEffect(() => {
        fetchBatchList()
      }, [])
    //fetch the list of pending betch
    async function fetchBatchList(){
        let response = await get(STORAGEKEYS.BATCHTOBESYNC);
        setBatchList(response);
    }
    async function syncNow(){
    try{
        setsyncText('Syncing')
        let request ={};
        request.url = POSTGEOLOCATION;
        request.method="POST";
        request.isAuthorized=true;
        for(let index=0;index<batchList.length;index++){
            let key=`${STORAGEKEYS.BATCHLOCATION}${batchList[index]}`
            request.body= await get(key);
            await Fetch(request);
            //remove the key
            await remove(key);
            //update the sync data key
            await removeFromArray(STORAGEKEYS.BATCHTOBESYNC,batchList[index]);
        }
    }
    catch(err){
        setsyncText("Sync Now");
        Alert.alert("Unable to Sync.Make sure you have good internet connectivity");
        return true;
    }
    Alert.alert("Successfully synced !!");
    setsyncText("Sync Now");
    setBatchList();
}
    return(
        <View>
            { batchList && batchList.length > 0 && batchList[0]>0 &&
            <View style={styles.fixToText}>
            <Text style={styles.title}>
            Please Sync the locations.
            </Text>
            <Button
            title={syncText}
            onPress={() => syncNow()}
          />
            </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        color:"#f194ff",
        textAlign:'center',
        marginTop:5
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop : 30,
        marginBottom: 50
    }
  });