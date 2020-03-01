import React, { Component } from "react";
import { Fetch } from '../utils/FetchApi';
import { BATCHLISTAPI } from '../restapi/Batch';
import {View, Text, Button, Alert, StyleSheet,ScrollView,Dimensions } from 'react-native';
import { save, get } from '../store/AsyncStorage';
import SyncData  from './SyncData';
export default class BtachList extends Component{
    state ={ batchList:[] }
    async componentDidMount(){
        try{
        let request ={};
        request.url = BATCHLISTAPI;
        request.method="GET";
        request.isAuthorized=true;
        let response = await Fetch(request);
        await save("batchList",response);
        this.setState({batchList:response})
        }
        catch(error){
        let response=await get("batchList");
        this.setState({batchList:response})
        }
    }
    render(){
    const screenHeight = Dimensions.get('window').height
    return(
        <View style={{height: screenHeight-150}}>
            <SyncData/>
            <Text>
                Click on a batch to start Geolocation
            </Text>
            <ScrollView>
            {this.state.batchList.map((value)=>{
                    return(
                        <View style={styles.listWrapper}>
                        <Button 
                        title={value.number}
                        onPress={() => Alert.alert(
                            value.number,
                            'Click on start button to start geolocation',
                            [
                              {text: 'Cancel', onPress: () => console.log('Cancel pressed'),style: 'cancel'},
                              {text: '', },
                              {text: 'Start', onPress: () => this.props.navigation.navigate('GeoLocation',{BatchId:value.id,BatchName:value.number})},
                            ],
                            { cancelable: true }
                          )
                          }/>
                        </View>
                )})
            }
             </ScrollView>
        </View>
    )}
}
const styles = StyleSheet.create({
    wrapper: {
      margin : 20
    },
    listWrapper: {
      marginLeft: 50,
      marginRight: 50,
      paddingTop: 50,
    }
  });