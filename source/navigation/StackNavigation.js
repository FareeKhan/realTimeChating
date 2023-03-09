import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/Auth/Login';
import SignUp from '../screen/Auth/SignUp';
import auth from '@react-native-firebase/auth';
import Home from '../screen/userScreens/Home';
import ChatScreen from '../screen/userScreens/ChatScreen';
import Iconic from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export const StackNavigation = ({ navigation }) => {
  const [userExist, setUserExist] = useState('')

  const userCheck = () => {
    const unSubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserExist(user)
        firestore().collection('users').doc(user.uid).update({
          status: 'online'
        })
      } else {
        setUserExist('')
      }
    })
  }
  useEffect(() => {
    userCheck()
  }, [])


  const logout = () => {
    firestore().collection('users').doc(userExist.uid).update({
      status: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      auth().signOut()
    })

  }


  const HomeScreens = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{
          headerTitleStyle: { color: "green" },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={logout} style={{ marginRight: 10 }}>
                <Iconic name="person-circle-outline" size={28} color={'green'} />
              </TouchableOpacity>
            )
          }
        }} >
          {props => <Home {...props} userExist={userExist} />}
        </Stack.Screen>
        <Stack.Screen name='ChatScreen' options={({ route }) => ({
          title: <View>
            <Text>{route.params.name}</Text>
            <Text>{route.params.status}</Text>
          </View>
        })}>
          {props => <ChatScreen {...props} userExist={userExist} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const Auth = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {userExist ?
        <HomeScreens />
        :
        <Auth />
      }
    </NavigationContainer>
  )
}









const styles = StyleSheet.create({})