/*
South Gatton Lot
West Linfield Lot
GreenHouse Lot
*/
import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator,} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Icon } from 'react-native-elements';
import { Font } from 'expo';

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
          title="Greenhouse Lot"
          onPress={() => this.props.navigation.navigate('GreenHouse')}
        />
        <Button
          title="West Linhfield Lot"
          onPress={() => this.props.navigation.navigate('Linhfield')}
        />
        <Button
          title="South Gatton Lot"
          onPress={() => this.props.navigation.navigate('Gatton')}
        />
        <Button
          title="North Hedges Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Roskie Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="South Hedges Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="South 12th Street Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Deer Street Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Langford Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Lewis and Clark Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Parking Garage"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Faculty Court"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Huffman Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="North Fieldhouse Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="South Fieldhouse Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Hamilton Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Roberts Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Antelope Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="East Linfield Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="West Stadium Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Lincoln Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Quads Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Harrison Street Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="S. 7th Reserved Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Stadium East Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Bison lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Yellowstone Lot"
          onPress={() => this.props.navigation.navigate('')}
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
	    dataSource: JSON.parse(JSON.parse(e.data).content)
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
      <View style={styles.lotStyle}>
        <Text style={styles.lotText}>Total Open: {this.state.dataSource.total}</Text>
        <Text></Text>
          <Image style={styles.lotImage} source={require('./GreenhouseLot.png')} />
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
	    dataSource: JSON.parse(JSON.parse(e.data).content)
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
      );
    }
    return (
      <View style={styles.lotStyle}>
        <Text style={styles.lotText}>Total Open: {this.state.dataSource.total}</Text>
        <Text></Text>
          <Image style={styles.lotImage} source={require('./GattonLot.png')} />
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
	    dataSource: JSON.parse(JSON.parse(e.data).content)
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
      );
    }
    return (
      <View style={styles.lotStyle}>
        <Text style={styles.lotText}>Total Open: {this.state.dataSource.total}</Text>
        <Text></Text>
          <Image style={styles.lotImage} source={require('./LinhfieldLot.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lotStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 36,
  },
  image: {
    height: 1000,
    width: 1000,
    resizeMode: 'contain',
  },
  lotImage: {
    height: 450,
    width: 350,
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
       return <AppContainer/>
  }
}


