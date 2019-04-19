import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Picker,} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements'

//AWS server address and port
const serverAddress = "18.222.24.171"
const serverPort = "12547"

var lotName = ["Antelope", "GreenHouse", "Gatton", "Linhfield"]

//Title Screen component - Contains selector tool to pick a university.
class TitleScreen extends React.Component {

   static navigationOptions = {
    title: 'SmartParkU',
   };
   
   constructor(props){
    super(props);
    this.state ={language: 'Home'}              
    }

   render() {
   return(
    <View style={styles.titleStyle}>
     <Image style={styles.titleImage} source={require('./smartparku.png')} />
     <Picker
      selectedValue={this.state.language}
      style={{height: 200, width: 400}}
      onValueChange={(itemValue, itemIndex) =>
         this.setState({language: itemValue})       
      }>
       <Picker.Item label="Montana State University" value='Home' />
       <Picker.Item label="University of Montana" value='UoM' />
      </Picker>
      <Button
          title="Go"
          onPress={() => 
            this.props.navigation.navigate(this.state.language)}
        />
    </View>
    );
  }
}

//HomeScreen for each university(WIP) displays lot names as buttons
class CampusHome extends React.Component {
     constructor(props){
       super(props);  
       this.state = {
          lots : ["GreenHouse","Linhfield","Gatton", "Antelope"]
          }
     }
     /*
     renderButtons = () => {

     var views = this.state.lots.map((step,move) =>;
     for ( var i =0; i < this.state.lots.length; i++){
       var navName = this.state.lots[i]
       var titleName = navName
       if(navName=="GreenHouse") {
         titleName = "Greenhouse Lot"
       }
       if(navName=="Linhfield") {
         titleName = "West Linhfield Lot"
       }
       if(navName=="Gatton") {
         titleName = "South Gatton Lot"
       }
       
       views.push(
       <Button
         key = {i}
         title = {titleName}
         onPress = {(i) => this.props.navigation.navigate(navName)}
         />
        )
        
       } 
     
      return views;
     }
     */
  static navigationOptions = {
    title: 'Lot Selection',
  };
  
  
    
  render() {
    
    return (
    /*
     <ScrollView styles={{resizeMode: 'contain'}}>  
      {this.renderButtons()}
     </ScrollView>
    */
    
    <View styles={{resizeMode: 'contain'}}>
       <Button
          color = "red"
          title="Campus Map"
          onPress={() => this.props.navigation.navigate('Map')}
        />
     <ScrollView styles={{resizeMode: 'contain'}}>
        <Button
          title="Antelope Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Bison lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Deer Street Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="East Linhfield Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Faculty Court"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Greenhouse Lot"
          onPress={() => this.props.navigation.navigate('GreenHouse')}
        />
        <Button
          title="Hamilton Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Harrison Street Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Huffman Lot"
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
          title="Lincoln Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="North Fieldhouse Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="North Hedges Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Parking Garage"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Quads Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Roberts Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="Roskie Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="S. 7th Reserved Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="South Fieldhouse Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="South Gatton Lot"
          onPress={() => this.props.navigation.navigate('Gatton')}
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
          title="Stadium East Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="West Stadium Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
        <Button
          title="West Linhfield Lot"
          onPress={() => this.props.navigation.navigate('Linhfield')}
        />
        <Button
          title="Yellowstone Lot"
          onPress={() => this.props.navigation.navigate('')}
        />
     </ScrollView>
     </View>
     
    );   
  }
}

//MapScreen contains map for specific university
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

/*  Greenhouse Lot at Montana state University. upon loading this component, the constructor
 *  is called and a message is generated which will be sent to the server. A fetch is made
 *  to obtain the current lot values in the database, which then updates the contents on
 *  screen. The message Var is then sent off to the server and a websocket handshake is 
 *  established. Once an update is sent from the server to the Lot, the number of spots
 *  available is updated. 
 */
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
        <Text style={styles.lotText}>Spots Open</Text>
        <Text style={styles.numLot}>{this.state.dataSource.total}</Text>
          <Image style={styles.lotImage} source={require('./GreenhouseLot.png')} />
      </View>     
    )
  }
}

/*  Gatton Lot at Montana state University. upon loading this component, the constructor
 *  is called and a message is generated which will be sent to the server. A fetch is made
 *  to obtain the current lot values in the database, which then updates the contents on
 *  screen. The message Var is then sent off to the server and a websocket handshake is 
 *  established. Once an update is sent from the server to the Lot, the number of spots
 *  available is updated. 
 */
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
        <Text style={styles.lotText}>Total Open </Text>
        <Text style={styles.numLot}>{this.state.dataSource.total}</Text>
          <Image style={styles.lotImage} source={require('./GattonLot.png')} />
      </View>
    );
  }
}

/*  Linhfield Lot at Montana state University. upon loading this component, the constructor
 *  is called and a message is generated which will be sent to the server. A fetch is made
 *  to obtain the current lot values in the database, which then updates the contents on
 *  screen. The message Var is then sent off to the server and a websocket handshake is 
 *  established. Once an update is sent from the server to the Lot, the number of spots
 *  available is updated. 
 */
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
        <Text style={styles.lotText}>Total Open </Text>
        <Text style={styles.numLot}>{this.state.dataSource.total}</Text>
          <Image style={styles.lotImage} source={require('./LinhfieldLot.png')} />
      </View>
    );
  }
}

//Style sheets specific to particular contents within the app
const styles = StyleSheet.create({
  titleStyle: {
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop: 50,
  },
  titleImage: {
    height: 200,
    width:350,
    resizeMode: 'contain',
  },
  lotStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
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
  numLot: {
   color: 'black',
   fontWeight: 'bold',
   fontSize: 36,
  },
});

//Used for navigation. Enables a trace of visited components with the Title Screen at 
//the root
const RootStack = createStackNavigator(
  {
    Title: TitleScreen,
    Home: CampusHome,
    Gatton: GattonLot,
    Linhfield: LinhfieldLot,
    GreenHouse: GreenHouseLot,
    Map: MapScreen,
  },
  {
    initialRouteName: 'Title',
  },
);

// encapsulates the navigation root stack in an app container.
const AppContainer = createAppContainer(RootStack);

//disables possible warning messages and returns the AppContainer with the Title Screen 
//at the root
export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  render() {
       return <AppContainer/>
  }
}



