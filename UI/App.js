/*
South Gatton Lot
West Linfield Lot
GreenHouse Lot
*/
import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from 'react-native-vector-icons/Ionicons';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
     <ScrollView style={{paddingTop: 10}}>
      <View> 
        <Button
          title="6) Greenhouse Lot"
          onPress={() => this.props.navigation.navigate('GreenHouse')}
        />
        <Button
          title="7) West Linfield Lot"
          onPress={() => this.props.navigation.navigate('Linfield')}
        />
        
        <Button
          title="11) South Gatton Lot"
          onPress={() => this.props.navigation.navigate('Gatton')}
        />
      </View>
     </ScrollView>
    );
  }
}

class MapScreen extends React.Component {

  render() {
    return (
      <ScrollView maximumZoomScale={2.5} minimumZoomScale={.38}
         contentContainerStyle={styles.scroll}>
      <Image style={styles.image} source={require('./parkingMap.png')} />
      </ScrollView>
    );
  }
}


class GreenHouseLot extends React.Component {
  static navigationOptions = {
    title: 'Greenhouse Lot',
  };
constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://18.222.24.171:12547/lots/greenhouse')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Text>E: {this.state.dataSource.E}</Text>
        <Text>F: {this.state.dataSource.F}</Text>
        <Text>SB: {this.state.dataSource.SB}</Text>
        <Text>R: {this.state.dataSource.R}</Text>
        <Text>Handicapped: {this.state.dataSource.Handicap}</Text>
      </View>
    );
  }
}

class GattonLot extends React.Component {
  static navigationOptions = {
    title: 'South Gatton Lot',
  };
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://18.222.24.171:12547/lots/south-gatton')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Text>E: {this.state.dataSource.E}</Text>
        <Text>F: {this.state.dataSource.F}</Text>
        <Text>SB: {this.state.dataSource.SB}</Text>
        <Text>R: {this.state.dataSource.R}</Text>
        <Text>Handicapped: {this.state.dataSource.Handicap}</Text>
      </View>
    );
  }
}

class LinfieldLot extends React.Component {
  static navigationOptions = {
    title: 'West Linhfield Lot',
  };
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://18.222.24.171:12547/lots/west-linhfield')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Text>E: {this.state.dataSource.E}</Text>
        <Text>F: {this.state.dataSource.F}</Text>
        <Text>SB: {this.state.dataSource.SB}</Text>
        <Text>R: {this.state.dataSource.R}</Text>
        <Text>Handicapped: {this.state.dataSource.Handicap}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lotText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 100,
  },
  image: {
    height: 1000,
    width: 1000,
    resizeMode: 'contain',
  },
  scroll: {
    width: 1000,
    height: 1000,
  },
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Gatton: GattonLot,
    Linfield: LinfieldLot,
    GreenHouse: GreenHouseLot,
    
  },
  {
    initialRouteName: 'Home',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: RootStack },
    Map: { screen: MapScreen },
  },
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  
  render() {
    return <AppContainer />;
  }
}
