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
    let value = '';
    try {
        value = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return value;
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

///action
  export const ACTION ={
    GET : "get",
    SAVE : "save",
    REMOVE : "remove",
    UPDATE : "update"
}
///keys
export const STORAGEKEYS ={
  BATCHLOCATION : "aibono_batchlocation_",
  BATCHTOBESYNC :"aibono_batchtobesync"
}