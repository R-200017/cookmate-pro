import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY='savedRecipes';

export const saveRecipe = async (newRecipe: any) => {
  try {
    const existing = await AsyncStorage.getItem('savedRecipes');
    const saved = existing ? JSON.parse(existing) : [];

    const isDuplicate = saved.some(
      (r: any) => r.name === newRecipe.name
    );

    if (isDuplicate) {
      throw new Error('Recipe already exists');
    }

    saved.push(newRecipe);
    await AsyncStorage.setItem('savedRecipes', JSON.stringify(saved));
  } catch (error) {
    throw error;
  }
};

export const getSavedRecipes = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to fetch saved recipes:', error);
    return [];
  }
};