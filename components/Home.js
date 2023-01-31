import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, {useState,useEffect, useRef} from 'react';
  import {deviceHeight, deviceWidth} from './Dimensions';
  //import Icon from 'react-native-vector-icons/Ionicons';
  import Cards from './Cards';
  
  import * as Device from 'expo-device';
  import * as Notifications from 'expo-notifications';
  
  import { Ionicons } from '@expo/vector-icons';
  

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
  async function sendPushNotification(expoPushToken) {
    alert("You have successfully subscribed for notification!")

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Weather app",
        body: 'Do not forget to check the weather for today!',
        data: {  },
      },
      trigger: { hour: 11,minute:36,repeats:true },
    });
    
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!  ','Permission not granted!!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('token- ', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  export default function Home(userN, props, navigation) {
    const [city, setCity] = useState('');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
    
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
   
    }, [navigation])

    const cities = [
      {name: 'Mumbai', image: require('../assets/Mumbai.png')},
      {name: 'Kolkata', image: require('../assets/Kolkata.png')},
      {name: 'New Delhi', image: require('../assets/Delhi.jpg')},
      {name: 'Chennai', image: require('../assets/Chennai.jpg')}
    ];


    var userName = userN.route.params.userN
    //console.log(userName)
    return (
      <View>
        <ImageBackground
          source={require('../assets/image2.jpg')}
          style={{height: deviceHeight, width: deviceWidth}}
          imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
        />
        <View
          style={{
            position: 'absolute',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}>
             <TouchableOpacity onPress={async () => {
          await sendPushNotification(expoPushToken);}}>
               
               
             <Ionicons name="md-notifications-circle-sharp" size={30} color="black" />
              </TouchableOpacity>
       
  
          <View style={{paddingHorizontal: 20, marginTop: 50}}>
            <Text style={{fontSize: 35, color: '#FFFFFF'}}> Hello {userName}</Text>
            <Text style= {{fontSize: 20, color: '#FFFFFF'}}> Search City by name </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'white',
                marginTop: 16,
                paddingHorizontal: 10,
              }}>
             {/*Text Input and the search button within the text input  width: 300, height: 50,borderWidth: 3, borderRadius: 30, borderColor: '#FFFFFF', justifyContent: 'center', alignSelf: 'center', textAlign: 'center', color: '#FFFFFF'*/}
             <TextInput
                style={{fontSize: 16, color: '#FFFFFF'}}
                value= {city}
                onChangeText= {val => setCity(val)}
                placeholderTextColor= '#FFFFFF'
                placeholder= 'Search Your City...'>
            </TextInput>

            {/*Search icon image */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Details', {name: city})}>
              <Ionicons name="md-search-circle-outline" size={30} color="white" />
            </TouchableOpacity>
            </View>
            
            <Text style={{color: 'white', fontSize: 25, paddingHorizontal: 10, marginTop: 120, marginBottom: 20}}>
              My Locations
            </Text>
           <FlatList
           horizontal
           data = {cities}
           renderItem= {({item}) => (
            <Cards name={item.name} image={item.image} navigation={props.navigation}></Cards>)}
            />
          </View>
        </View>
      </View>
    );
  }
  