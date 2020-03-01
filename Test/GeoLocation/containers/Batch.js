import React ,{ Component } from 'react';
import { View } from 'react-native';
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
        <View>
            <AppHeader/>
           <BatchList navigation={this.props.navigation}/>
        </View>
    )
}
}