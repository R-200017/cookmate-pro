const PEXELS_API_KEY = 'gNR2BJbUxtI2JokzytTw1j2Pm85v3PKYfVOTqHEN9LiWP5zJYIDtSi1Z';

export const fetchPexelsImage = async (recipeName: string, ingredients: string[], mealType?: string) => {
const tryFetch = async (query: string) => {
try {
 const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10 `,
  {
  headers: {
      Authorization: PEXELS_API_KEY,
 },
 }
  );
  const data = await response.json();
 if (data.photos && data.photos.length > 0) {
 const randomIndex = Math.floor(Math.random() * data.photos.length);
 return data.photos[randomIndex].src.medium;
 }
 return null;
 } catch (err) {
console.error('Pexels API error:', err);
return null;
 }
 };

// Try with full query first
 const mainIngredients = ingredients.slice(0, 2).join(' ');
 const fullQuery = `${recipeName} ${mainIngredients} ${mealType || ''} food `;
 let imageUrl = await tryFetch(fullQuery);

 // Try fallback if needed
if (!imageUrl) {
  imageUrl = await tryFetch(`${recipeName} food `);
}

 if (!imageUrl) 
  { imageUrl = await tryFetch(`${mainIngredients} food`);
 }

 return imageUrl || 'https://via.placeholder.com/150';
};