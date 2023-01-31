import {
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
   
  } from 'react-native';
  import React, {useState} from 'react';
  import {deviceHeight, deviceWidth} from './Dimensions';

  
  export default function FlashScreen(props) {
    const [user, setUser] = useState('');
  
    return (
        <ImageBackground source={require('../assets/image1.jpg')}style={{height: deviceHeight, width: deviceWidth,/*alignContent:'center',alignItems:'center',justifyContent:'center',*/alignSelf:'center',flex:1}} resizeMode='cover'>
            <View style={{marginTop: deviceHeight/15, flexDirection: 'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/logo.png')} style={{width: 50, height: 50}}></Image>
                <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold', marginTop: 5}}>Weather Now!</Text>
            </View>
            <View>
                <Text style={{color: '#FFFFFF', fontSize: 15, textAlign: 'center', fontWeight: 'bold', marginTop: 30}}>Easy steps to find your weather and make your day easier!</Text>
            </View>
            <View
              style={{
                width: 300,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'white',
                marginTop: deviceHeight - 350,
                paddingHorizontal: 10,
              }}>
            <TextInput
                style={{fontSize: 16, color: '#FFFFFF'}}
                value= {user}
                onChangeText= {val => setUser(val)}
                placeholderTextColor= '#FFFFFF'
                placeholder= 'Entre Your Name...'>
            </TextInput>
            </View>
            <View style={{alignContent:'center',alignItems:'center',justifyContent:'center', marginTop: 15}}>
                <TouchableOpacity 
                  style={{width: 260,height: 50,flexDirection: "row",justifyContent: "space-evenly",alignItems: "center",borderWidth: 2,borderRadius: 30,borderColor: '#F08080',backgroundColor: "#191970",}}
                  onPress={() => props.navigation.navigate('Home', {userN: user})}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Explore Now!!</Text>
                    <Image source={require('../assets/arrow.gif')} style={{width: 70, height: 40}}></Image>
                </TouchableOpacity>
            </View>
        </ImageBackground>
 
    );
  }