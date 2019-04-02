/*
South Gatton Lot
West Linfield Lot
GreenHouse Lot
*/
import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Icon } from 'react-native-elements';

const serverAddress = "18.222.24.171"
const serverPort = "12547"

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
          title="7) West Linhfield Lot"
          onPress={() => this.props.navigation.navigate('Linhfield')}
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
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket("ws://" +serverAddress +":" +serverPort +"/ws");
  }
  
  componentDidMount() {
   fetch("http://" +serverAddress +":" +serverPort +"/lots/greenhouse")
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
      
  this.ws.onopen = () => {
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
    this.ws.close();
    console.log(e.code, e.reason);
  };

  }
  render () {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.total}</Text>
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
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket("ws://" +serverAddress +":" +serverPort +"/ws");
  }
  
  componentDidMount() {
    fetch("http://" +serverAddress +":" +serverPort +"/lots/south-gatton")
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
    this.ws.close();
    console.log(e.code, e.reason);
  };

  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }


    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.total}</Text>
        <Text></Text>
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={.38}
         contentContainerStyle={styles.scroll}>
          <Image style={styles.image} source={require('./GattonLot.png')} />
        </ScrollView>
      </View>
    );
  }
}

class LinhfieldLot extends React.Component {
  static navigationOptions = {
    title: 'West Linhfield Lot',
  };
  constructor(props){
    super(props);
    messageVar = {
              content: 'subscribe',
              topic: 'west-linhfield'
    }
    
    this.state ={ isLoading: true,
                  dataSource: ''
                }
    this.ws = new WebSocket("ws://" +serverAddress +":" +serverPort +"/ws");
  }
  
  componentDidMount() {
    fetch("http://" +serverAddress +":" +serverPort +"/lots/west-linhfield")
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
    this.ws.close();
    console.log(e.code, e.reason);
  };

  }
  render(){
     if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
//
    return (
      <View style={{flex: 1}}>
        <Text>Total Open: {this.state.dataSource.total}</Text>
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
    Linhfield: LinhfieldLot,
    GreenHouse: GreenHouseLot,
    
  },
  {
    initialRouteName: 'Home',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: RootStack, 
            navigationOptions: {
              tabBarIcon: ({tintColor}) => <Icon name="home" type="Ionicon" size={28} color={tintColor} />
            },
          },
    Map: { screen: MapScreen,
           navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Icon name="map" type="Ionicon" size={28} color={tintColor} />         
           },
     },
  },
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  
  render() {
    return <AppContainer />;
  }
}
