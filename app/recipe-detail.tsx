import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text,ScrollView, Image, StyleSheet,TouchableOpacity, Alert,} from 'react-native';
import { saveRecipe } from '@/services/Storage';

export default function RecipeDetail() {
  const { recipe } = useLocalSearchParams();
  const data = JSON.parse(recipe as string);

  const handleSave = async () => {
    try {
      await saveRecipe(data);
      Alert.alert('Saved', 'Recipe has been saved successfully!');
    } catch (err: any) {
      if (err.message === 'Recipe already exists') {
        Alert.alert('Already Saved', 'This recipe is already in your saved list.');
      } else {
        console.error('Save error:', err);
        Alert.alert('Error', 'Could not save the recipe.');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{data.name}</Text>
        <Image source={{ uri: data.image }} style={styles.image} />

        <Text style={styles.section}>Ingredients:</Text>
        {data.ingredients.map((item: string, index: number) => (
          <Text key={index} style={styles.ingredient}>• {item}</Text>
        ))}

        <Text style={styles.section}>Instructions:</Text>
        <Text style={styles.instructions}>{data.instructions}</Text>

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 3,
  },
  instructions: {
    fontSize: 16,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});