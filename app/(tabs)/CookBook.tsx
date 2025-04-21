
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import {getSavedRecipes}from '@/services/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { saveRecipe } from '@/services/Storage';


const STORAGE_KEY = 'savedRecipes';

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const data = await getSavedRecipes();
    setRecipes(data);
  };

  const openRecipe = (recipe: any) => {
    router.push({
      pathname: '/recipe-detail',
      params: { recipe: JSON.stringify(recipe) },
    });
  };

  const deleteRecipe = async (index: number) => {
    Alert.alert('Delete Recipe', 'Are you sure you want to delete this recipe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = [...recipes];
          updated.splice(index, 1);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          setRecipes(updated);
        },
      },
    ]);
  };

  const clearAll = () => {
    Alert.alert('Clear All', 'Delete all saved recipes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setRecipes([]);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openRecipe(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteRecipe(index)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Recipes</Text>

      {recipes.length > 0 && (
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={recipes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  image: { width: '100%', height: 150 },
  title: { padding: 10, fontSize: 16, fontWeight: '600' },
  deleteText: {
    color: 'red',
    textAlign: 'right',
    marginRight: 15,
    fontWeight: 'bold',
  },
  clearAll: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

