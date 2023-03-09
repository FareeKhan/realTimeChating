import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../component/CustomInput'
import CustomButton from '../../component/CustomButton'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const userLogin = async () => {
    setLoading(true)
    if (!email || !password) {
      alert('Please Fill all Fields')
      setLoading(false)
    }
    else {
      try {
        const result = await auth().signInWithEmailAndPassword(email, password)
        setLoading(false)
        setEmail('')
        setPassword('')
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
        setLoading(false)
        if (error.code == 'auth/invalid-email') {
          alert('Email Formate is not Correct.')
        }
        if (error.code == 'auth/network-request-failed') {
          alert('Please Check your internet')
        }
        if (error.code == 'auth/too-many-requests') {
          alert('We have blocked all requests from this device due to unusual activity. Try again later.')
        }
        if (error.code == 'auth/wrong-password') {
          alert('The password is invalid or the user does not have a password')
        }
        if (error.code == 'auth/user-not-found') {

          alert('There is no user record corresponding to this identifier. The user may have been deleted.')

        }
      }
    }

  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Welcome to Whatsapp </Text>
      <View style={{ alignItems: 'center', paddingBottom: 50 }}>
        <Image source={require('../../assets/whatsap.png')} style={styles.imgStyle} />
      </View>
      <View>
        <CustomInput
          placeholder={'Enter Email'}
          value={email}
          onChangeText={setEmail}
          autoFocus
        />
        <CustomInput
          placeholder={'Enter password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {
          loading ?
            <View style={{ paddingVertical: 10, backgroundColor: "green" }}>
              <ActivityIndicator size={'small'} color={'#fff'} />
            </View>
            :
            <CustomButton
              title='Login'
              onPress={() => { userLogin() }}
            />

        }

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
          <Text style={{ color: "green" }}>Dont Have an account?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50
  },
  headerTitle: {
    color: "green",
    fontSize: 28,
    textAlign: "center"
  },
  imgStyle: {
    height: 140,
    width: 200,
  },


})
