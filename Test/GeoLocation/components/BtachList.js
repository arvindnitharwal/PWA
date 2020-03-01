import React, { Component } from "react";
import { Fetch } from '../utils/FetchApi';
import { BATCHLIST } from '../restapi/Batch';
import {View, Text, Button, Alert, StyleSheet } from 'react-native';
import { save, get } from '../store/AsyncStorage';
export default class BtachList extends Component{
    state ={ batchList:[] }
    async componentDidMount(){
        try{
        let response=[
            {
                "id": 1,
                "number": "F1_Basil_Italian_2019",
                "acres": 3.0,
                "farmer": 6,
                "crop": 1,
                "seedling_count": 3000,
                "seedling_delivery_date": "2020-02-03",
                "seedling_transplant_date": "2020-02-05",
                "is_closed": false,
                "closed_date": null,
                "seedling_price": 2.0,
                "buyback_price_per_kg": 50.0,
                "service_price_per_kg": 1.0,
                "is_verified": false,
                "is_financially_closed": false
            },
            {
                "id": 2,
                "number": "F2_Celery_2019",
                "acres": 2.0,
                "farmer": 7,
                "crop": 8,
                "seedling_count": 1000,
                "seedling_delivery_date": "2020-02-03",
                "seedling_transplant_date": "2020-02-05",
                "is_closed": false,
                "closed_date": null,
                "seedling_price": 1.0,
                "buyback_price_per_kg": 40.0,
                "service_price_per_kg": 1.0,
                "is_verified": false,
                "is_financially_closed": false
            }];
        // let request ={};
        // request.url = "https://apitest.aibono.net/v1/batches/";
        // request.method="GET";
        // request.isAuthorized=true;
        // let response = await Fetch(request);
        // await save("batchList",JSON.stringify(response));
        this.setState({batchList:response})
        }
        catch(error){
        let response=await get("batchList");
        response=JSON.parse(response);
        console.log(response)
        this.setState({batchList:response})
        }
    }
    render(){
    return(
        <View style={styles.wrapper}>
            <Text>
                Click on a batch to start Geolocation
            </Text>
            {
                this.state.batchList.map((value)=>{
                    return(
                        <View style={styles.burronWrapper}>
                        <Button 
                        title={value.number}
                        onPress={() => Alert.alert(
                            value.number,
                            'Click on start button to start geolocation',
                            [
                              {text: 'Cancel', onPress: () => console.log('Cancel pressed'),style: 'cancel'},
                              {text: '', },
                              {text: 'Start', onPress: () => this.props.navigation.navigate('GeoLocation',{BatchId:value.id})},
                            ],
                            { cancelable: true }
                          )
                          }/>
                        </View>
                )})
            }
        </View>
    )}
}
const styles = StyleSheet.create({
    wrapper: {
      margin : 20
    },
    burronWrapper: {
      marginLeft: 50,
      marginRight: 50,
      paddingTop: 50,
    }
  });