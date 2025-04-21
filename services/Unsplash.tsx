const UNSPLASH_ACCESS_KEY= '_SQA4YOveNobke04a4W7Bmt9LTlt0UHjbbUwmZ58lCQ';



export const fetchUnsplashImage = async ( query: string) => {
 try {
 

 
 const response = await fetch(
 `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=10`
 );
 const data = await response.json();

 if (data.results && data.results.length > 0) {
 const randomIndex = Math.floor(Math.random() * data.results.length);
 
 return data.results[randomIndex].urls.small;
 } else {
 return 'https://via.placeholder.com/150'; // fallback image
 }
 } catch (error) {
 console.error('Unsplash API Error:', error);
 return 'https://via.placeholder.com/150'; // fallback image
 }
};