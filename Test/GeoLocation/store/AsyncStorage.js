import { AsyncStorage } from 'react-native';
const save = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const get = async (key) => {
    let value = '';
    try {
        value = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return value;
  }

  const remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  const update = async (key,value) => {
    try {
      await AsyncStorage.mergeItem(key,JSON.stringify(value));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  export default AsyncStorage;