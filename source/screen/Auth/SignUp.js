import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../component/CustomInput'
import CustomButton from '../../component/CustomButton'
import ImageCropPicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'



const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <ActivityIndicator size={'large'} color={'red'} />
  }
  const userSignUp = async () => {
    setLoading(true)
    if (!email || !name || !password || !image) {
      alert('Please Fill all Fields')
      setLoading(false)
    }
    else {
      try {
        const result = await auth().createUserWithEmailAndPassword(email, password)
        const userData = await firestore().collection('users').doc(result.user.uid).set({
          email,
          name,
          image,
          userId: result.user.uid
        })
        setLoading(false)
        setEmail('')
        setPassword('')
        setImage('')
        setName('')
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

  }

  const takeImageFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const uploadTask = storage().ref().child(`/UserProfile/${Date.now()}`).putFile(image.path)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            alert('Image Uploaded')
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL)
          });
        }
      );

    }).catch((error)=>{
      console.log(error)
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Welcome to Whatsapp 9.1</Text>
      <View style={{ alignItems: 'center', paddingBottom: 50 }}>
        <Image source={require('../../assets/whatsap.png')} style={styles.imgStyle} />
      </View>
      <View>
        {!isShow &&
          <>
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
          </>
        }

        {
          isShow ?
            <>
              <View style={{ marginBottom: 30 }}>
                <CustomInput
                  placeholder={'Enter Name'}
                  value={name}
                  onChangeText={setName}
                />

                <CustomButton
                  title='Upload Picture'
                  onPress={takeImageFromGallery}
                />
              </View>
              <CustomButton
                title='SignUp'
                onPress={userSignUp}
                disabled={image ? false : true}
              />
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text style={{ color: "green" }}>Already Have an account?</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <CustomButton
                title='Next'
                onPress={() => setIsShow(true)}
              />
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text style={{ color: "green" }}>Already Have an account?</Text>
              </TouchableOpacity>
            </>
        }
      </View>
    </ScrollView>
  )
}

export default SignUp

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