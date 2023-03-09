import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const Home = ({ navigation, userExist }) => {
  const [data, setData] = useState()

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const response = await firestore().collection('users').where('userId', '!=', userExist.uid).get()
    const result = response.docs.map((item) => item.data())
    setData(result)
  }

  const renderItem = (item, index) => {
  const showStatus = typeof(item.item.status) == 'string' ? item.item.status:item.item.status .toDate().toString()
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChatScreen', {
        name: item.item.name,
        uid: item.item.userId,
        status:showStatus
      })}>
          <Image source={{ uri: item.item.image }} style={styles.imgStyle} />
          <View style={styles.cardText}>
            <Text>{item.item.name}</Text>
            <Text>{item.item.email}</Text>
          </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.header}>
        <Text style={styles.headeTitle}>Home</Text>
        <TouchableOpacity onPress={logout}>
          <Iconic name="person-circle-outline" size={24} color={'green'} />
        </TouchableOpacity>
      </View> */}

      <View style={{}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: 'green'
  },
  headeTitle: {
    fontSize: 20,
    color: "green",
    fontWeight: '600'
  },
  imgStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: 'gray',
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  cardText: {
    marginLeft: 15
  }
})