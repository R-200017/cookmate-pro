import Colors from '@/services/Colors'
import { View, Text,Image,Switch } from 'react-native'
import React, {useState} from 'react'



export default function IntroHeader() {
    const[isEnabled,setIsEnabled]=useState(false)

  return (
    <View style={{
      display:'flex',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between'

    }}>
      <View style={{
            display:'flex',
            flexDirection: 'row',
            alignItems:'center',
            gap: 8
      }}>
        <Image source ={require('./../assets/images/logo.jpg')} 
         style={{
         width:80,
         height:80,
         borderRadius:99,
         borderWidth:2,
         borderColor:Colors.PRIMARY
      }} 
     />
     <Text style={{
      fontFamily:'outfit-bold',
      fontSize:20
     }}>
      Hello!!
        </Text>
     </View>
       <View 
       style={{ 
             display:'flex',
             flexDirection: 'row',
             alignItems:'center',
             gap: 4
         }}>
    
            
       </View>
    </View>
  )
}



   
       

