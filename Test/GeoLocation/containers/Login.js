import React, { Component } from "react";
import AppHeader from '../components/AppHeader';
import {LOGINAPI} from '../restapi/Login';
import { save, get } from '../store/AsyncStorage';
import NetInfo from "@react-native-community/netinfo";
import {
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import InputField from '../components/InputField';
import { Fetch } from '../utils/FetchApi';
export default class Login extends Component {
  state = {
    userName:null,
    password:null,
  }
  getUserName = (userName) =>{
    this.setState({userName:userName})
  }
  getPassword = (password) =>{
    this.setState({password:password})
  }
  vaildateUser = (storedUsername,storedPassword) =>{
    return ((storedUsername===this.state.userName) && (storedPassword===this.state.password));
  }
  loginCredentials = async() =>{
    let response= await NetInfo.fetch();
    if(!(response.isConnected || response.isInternetReachable)){
      //check for aibono user
      let storedAccessToken = await get("access");
      let storedUsername = await get("userName");
      let storedPassword = await get("password");
      if(storedAccessToken && this.vaildateUser(storedUsername,storedPassword)){
        this.props.navigation.navigate('Batch')
      }
      else{
        Alert.alert("Invalid username or password !!");
      }
    }
    else{
    let data = {};
    let request = {};
    data.username = this.state.userName;
    data.password = this.state.password;
    request.method="POST";
    request.url=LOGINAPI;
    request.body=data;
    let response = await Fetch(request);
    if(response.access){
      await save("access", `Bearer ${response.access}`);
      await save("refresh", response.refresh);
      await save("userName", data.username);
      await save("password", data.password);
      this.props.navigation.navigate('Batch')
    }
    else{
      Alert.alert("Invalid username or password!!");
    }
  }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
         <AppHeader/>
        <View style={styles.scrollViewWrapper}>
          <ScrollView >
            <InputField 
              labelText="Username" 
              labelTextSize={14} 
              labelColor="#008080"
              textColor="#008080" 
              borderBottomColor="#008080" 
              inputType="username" 
              customStyle={{marginBottom:30}} 
              onChange={this.getUserName}
                
            />
            <InputField 
              labelText="Password" 
              labelTextSize={14} 
              labelColor="#008080" 
              textColor="#008080" 
              borderBottomColor="#008080" 
              inputType="password"  
              customStyle={{marginBottom:30}}
              onChange={this.getPassword}
            />
            <Button
            title="Login"
            onPress={() => this.loginCredentials()}/>
          </ScrollView>
         </View>
         <View style={{ height: 10 }} />
       </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
    wrapper: {
      display: "flex",
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scrollViewWrapper: {
      marginLeft: 50,
      marginRight: 50,
      paddingTop: 60,
      flex: 1
    },
    avoidView: {
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 20,
      flex:1
     },
  });