import {View, ImageBackground, Image, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceHeight, deviceWidth} from './Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Details(props) {
  const [data, setData] = useState();    //Create a hook to hold the API result
  const {name} = props.route.params;
  console.log('name')
  const API_KEY = '46a9246bebba16d42b36aac3fc3ba8af'
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`, //Fill in the parameters
    )
      .then(res => res.json())
      .then(res => setData(res)) //set into the "data" hook
      .catch(err => console.log(err));
  }, []);
  const Data = ({title, value}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: 'gray', fontSize: 22}}>{title}</Text>
      <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
    </View>
  );
  return (
    <View>
      <ImageBackground
        source={require('../assets/image1.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View
        style={{
          position: 'absolute',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
       
        { data? (    // if "data" is empty check?
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: deviceHeight - 100,
            }}>
            <View>
              <Text style={{color: 'white', fontSize: 40}}>{name}</Text>
              
              <Text style={{fontSize: 22, color: 'white', textAlign:"center"}}>
              {/* Display the "main" information from "weather"  */}
                {data['weather'][0]['main']}   
              </Text>
            </View>
            <Text style={{color: 'white', fontSize: 64}}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>
            <View>
            <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Details</Text>
            <View style={{width: deviceWidth - 60}}>
            {/* Display the wind's speed */}
              <Data value={data['wind']['speed']} title="Wind" />  
              {/* Display the pressure */}
              <Data value={data['main']['pressure']} title="Pressure" /> 
              <Data value={`${data['main']['humidity']}%`} title="Humidity" />
              {/* Display the visibility */}
              <Data value={data['visibility']} title="Visibility" />  
            </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
