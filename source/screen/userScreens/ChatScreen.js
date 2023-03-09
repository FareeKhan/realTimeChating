import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
const ChatScreen = ({userExist,route}) => {
  const {uid}=route.params
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    getAllMsgs()
  }, [])

  const getAllMsgs= ()=>{
    const docId = uid > userExist.uid ? userExist.uid+"-"+uid : uid+'-'+userExist.uid
    const messageRef =  firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt','desc')

    const unSubscribe =  messageRef.onSnapshot((querySnap) => {
      const allMsg = querySnap.docs.map((docSnap) => {
        const data = docSnap.data()

        if(data.createdAt){
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate()
          }
        }
        else{
          return {
            ...docSnap.data(),
            createdAt: new Date()
          }
        } 
      })

      setMessages(allMsg)
    })
    return ()=>{
      unSubscribe()
    }
  }

  const onSend = (messageArray) => {
    const myArry = messageArray[0]

    const myMsg = {
      ...myArry,
      sendBy:userExist.uid,
      sendTo:uid,
      createdAt:new Date()
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

    const docId = uid>userExist.uid ? userExist.uid+"-"+uid : uid+'-'+userExist.uid
    
    const response = firestore().collection('chatroom').doc(docId).collection('messages').add({
      ...myMsg,
      createdAt:new Date()
    })

  }

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
       <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userExist.uid,
      }}
      renderBubble={(props)=>{
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: 'green'
              },
              left:{
                marginLeft:-40
              }
            }}
          />
        )
      }}
    />
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})































// import { StyleSheet, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Bubble, GiftedChat } from 'react-native-gifted-chat';
// import firestore from '@react-native-firebase/firestore';

// const ChatScreen = ({ userExist, route }) => {
//   const { uid } = route.params
//   const [messages, setMessages] = useState([]);

//   const getEveryThing = async () => {
//     const docId = uid > userExist.uid ? userExist.uid + '-' + uid : uid + '-' + userExist.uid
//     const querySanp = await firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt', 'desc').get()
//     const allMsg = querySanp.docs.map((docSnap) => {
//       return {
//         ...docSnap.data(),
//         createdAt: docSnap.data().createdAt.toDate()
//       }
//     })
//     console.log('This is ', allMsg)
//     setMessages(allMsg)
//   }

//   useEffect(() => {
//     // getEveryThing()
//     const docId = uid > userExist.uid ? userExist.uid + '-' + uid : uid + '-' + userExist.uid
//     const response = firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt', 'desc')
   
//     response.onSnapshot((querySnap) => {
//       const allMsg = querySnap.docs.map((docSnap) => {
//         const data = docSnap.data()
//         if(data.createdAt){
//           return {
//             ...docSnap.data(),
//             createdAt: docSnap.data().createdAt.toDate()
//           }
//         }else{
//           return {
//             ...docSnap.data(),
//             createdAt: new Date()
//           }
//         } } )
//       setMessages(allMsg)
//     })
//   }, [])

//   const onSend = (messageArray) => {
//     const msg = messageArray[0]
//     const myMsg = {
//       ...msg,
//       sentBy: userExist.uid,
//       sentTo: uid,
//       createdAt: new Date()
//     }
//     setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
//     const docId = uid > userExist.uid ? userExist.uid + '-' + uid : uid + '-' + userExist.uid
//     firestore().collection('chatroom').doc(docId).collection('messages').add({
//       ...myMsg,
//       createdAt: firestore.FieldValue.serverTimestamp()
//     })


//   }

//   return (
//     <View style={{ flex: 1 ,backgroundColor:"#fff"}}>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: userExist.uid,
//         }}
//         renderBubble={(props)=>{
//           return (
//             <Bubble
//               {...props}
//               wrapperStyle={{
//                 right: {
//                   backgroundColor: 'green'
//                 },
//                 left: {
//                   marginLeft:-40
//                 }
//               }}
//             />
//           )
//         }}
//       />
//     </View>
//   )
// }

// export default ChatScreen

// const styles = StyleSheet.create({})