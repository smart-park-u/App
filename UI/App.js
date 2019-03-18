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
    messageVar = {
              content: 'subscribe',
              topic: 'greenhouse'
    }
    dataSource = ''
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket('ws://18.222.24.171:12547/ws');
  }
  
  componentDidMount() {

  this.ws.onopen = () => {
  // connection opened
  this.ws.send(JSON.stringify(messageVar)); // send a message
  };

  this.ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
	this.setState({
	    dataSource: JSON.parse(e.data)
	})
	console.log("DataSRC = ", this.state.dataSource)
	
  };

  this.ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
  };

  this.ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };

  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.content}</Text>
        <Text></Text>
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={.38}
         contentContainerStyle={styles.scroll}>
          <Image style={styles.image} source={require('./GreenhouseLot.png')} />
        </ScrollView>
      </View>
     
    )
  }
}

class GattonLot extends React.Component {
  static navigationOptions = {
    title: 'South Gatton Lot',
  };
  constructor(props){
    super(props);
    messageVar = {
              content: 'subscribe',
              topic: 'gatton'
    }
    dataSource = ''
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket('ws://18.222.24.171:12547/ws');
  }
  
  componentDidMount() {

  this.ws.onopen = () => {
  // connection opened
  this.ws.send(JSON.stringify(messageVar)); // send a message
  };

  this.ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
	this.setState({
	    dataSource: JSON.parse(e.data)
	})
	console.log("DataSRC = ", this.state.dataSource)
	
  };

  this.ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
  };

  this.ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };

  }
  render(){


    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.content}</Text>
        <Text></Text>
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={.38}
         contentContainerStyle={styles.scroll}>
          <Image style={styles.image} source={require('./GattonLot.png')} />
        </ScrollView>
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
    messageVar = {
              content: 'subscribe',
              topic: 'linhfield'
    }
    dataSource = ''
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket('ws://18.222.24.171:12547/ws');
  }
  
  componentDidMount() {

  this.ws.onopen = () => {
  // connection opened
  this.ws.send(JSON.stringify(messageVar)); // send a message
  };

  this.ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
	this.setState({
	    dataSource: JSON.parse(e.data)
	})
	console.log("DataSRC = ", this.state.dataSource)
	
  };

  this.ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
  };

  this.ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };

  }
  render(){

    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.content}</Text>
        <Text></Text>
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={.38}
         contentContainerStyle={styles.scroll}>
          <Image style={styles.image} source={require('./LinhfieldLot.png')} />
        </ScrollView>
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
