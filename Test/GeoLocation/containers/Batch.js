import React ,{ Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BatchList from '../components/BtachList';
import AppHeader from '../components/AppHeader';
export default class Batch extends Component {
    state ={
        batchList:null
    }
    async componentDidMount(){

    }
render(){
    return (
        <View style={styles.wrapper}>
            <AppHeader/>
           <BatchList navigation={this.props.navigation}/>
        </View>
    )
}
}
const styles = StyleSheet.create({
    wrapper: {
      margin : 20
    }});