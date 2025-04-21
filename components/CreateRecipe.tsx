import { View, Text, Image, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/services/Colors';
import Button from './Button';
import { generatePrompt } from '@/services/Prompt';
import { AiModel } from '@/services/GlobalApi';
import { useRouter } from 'expo-router';
import { fetchPexelsImage} from '@/services/pexels';
import { replace } from 'expo-router/build/global-state/routing';

export default function CreateRecipe() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const router =useRouter();

  const handleGenerate = async () => {
    if (!userInput.trim()) return Alert.alert('Enter ingredients first!');

    try {
      setLoading(true);
      const prompt = generatePrompt(userInput);
      const response = await AiModel(prompt);
      console.log( 'AI Response: ',JSON.stringify(response,null,2));

      //const content = response.choices?.[0]?.message?.content;
      let content = response.choices?.[0]?.message?.content ?? '';
      const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
      //const generatedRecipes = JSON.parse(cleaned!);
      let generatedRecipes;
      try{
        generatedRecipes =JSON.parse(cleaned);
      }catch(jsonError){
        console.error('JSON Parse Error:',jsonError);
        Alert.alert('Unexpected AI Response','Please try again.');
        return;
      }
      

      const recipesWithImages = await Promise.all(
      generatedRecipes.map(async (recipe: any) => {
      const imageUrl = await fetchPexelsImage(recipe.name,recipe.ingredients,recipe.mealType);
      return { ...recipe, image: imageUrl };
        })
         );

      setRecipes(recipesWithImages);
      
      Alert.alert('Recipes Generated', 'Choose one to view details.');
    } catch (err) {
      console.error('Generation Error:', err);
      Alert.alert('Error', 'Failed to generate recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe =  (recipe: any) => {
    router.push({
      pathname:'/recipe-detail',
      params:{
        recipe:JSON.stringify(recipe)},
    });
    
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Image source={require('./../assets/images/pan.gif')} style={styles.panImage} />
        <Text style={styles.heading}>Warm up your stove, and let's get cooking!</Text>
        <Text style={styles.subHeading}>Make something for your Family</Text>

        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
          placeholder='What do you want to create? What ingredients do you have?'
          onChangeText={(value) => setUserInput(value)}
        />

        <Button label={loading ? 'Generating...' : 'Generate Recipe'} onPress={handleGenerate} icon={'sparkles'} />

        {recipes.length > 0  && (
          <View style={styles.recipeList}>
            {recipes.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleSelectRecipe(item)} style={styles.recipeCard}>
                <Image source={{ uri: item.image }} style={styles.recipeThumb} />
                <Text style={styles.recipeTitle}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

       
      </View>
    </ScrollView>
  );
}
 
 
 
 const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.Secandary,
    borderRadius: 25,
    alignItems: 'center',
  },
  panImage: {
    width: 80,
    height: 80,
  },
  heading: {
    fontFamily: 'outfit',
    fontSize: 23,
    textAlign: 'center',
  },
  subHeading: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginTop: 6,
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginTop: 8,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  recipeList: {
    marginTop: 20,
    width: '100%',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
    gap: 10,
  },
  recipeThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
  
 
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '600',
    flexShrink:1,
  },
  
 
});