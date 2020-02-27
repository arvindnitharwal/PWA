import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Batch from './containers/Batch';
import GeoLocation from './containers/GeoLocation';

const NavigationStack = createStackNavigator({
  Batch: { screen: Batch,
    navigationOptions: {
    headerShown: false,
  }},
  GeoLocation: { screen: GeoLocation },
});
const Container = createAppContainer(NavigationStack);

export default Container;