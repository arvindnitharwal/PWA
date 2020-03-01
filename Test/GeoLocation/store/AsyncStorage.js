import { AsyncStorage } from 'react-native';
export const save = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.log(error.message);
      //show alert message for each console.log
      return false;
    }
  };

  export const get = async (key) => {
    try {
      let response= await AsyncStorage.getItem(key) || null;
      return JSON.parse(response);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  export const remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  export const update = async (key,value) => {
    try {
      let locationArray = [];
      let response = await AsyncStorage.getItem(key) || null;
      if(response!=null){
      response=JSON.parse(response);
      locationArray=response;
      }
      locationArray.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(locationArray));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  export const removeFromArray = async (key,value) =>{
    try {
      let response = await AsyncStorage.getItem(key) || null;
      if(response!=null){
      response=JSON.parse(response);
      response.splice(response.findIndex(e => e==value),1);
      }
      await AsyncStorage.setItem(key, JSON.stringify(response));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

///action
  export const ACTION ={
    GET : "get",
    SAVE : "save",
    REMOVE : "remove",
    UPDATE : "update",
    REMOVEFROMARRAY :"removefromarray"
}
///keys
export const STORAGEKEYS ={
  INDIVIDUALBATCHLOCATION : "aibono_individual_",
  BATCHLOCATION : "aibono_batchlocation_",
  BATCHTOBESYNC :"aibono_batchtobesync"
}