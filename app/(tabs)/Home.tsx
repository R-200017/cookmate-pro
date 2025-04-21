
import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import IntroHeader from '@/components/IntroHeader'
import CreateRecipe from '@/components/CreateRecipe'
import { ScrollView } from 'react-native'


export default function Home() {
  return (
    <ScrollView style={{
        height:'100%',
        backgroundColor:Colors.WHITE,
        padding:20
    }}>
        {/*Intro */}
          <IntroHeader/>
        {/*Recipe Generator UI */}
           <CreateRecipe/>
       
    </ScrollView>
  )
}


