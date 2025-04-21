export const generatePrompt = (ingredients: string) => {
   return `Generate 3 unique and creative recipes based on the following ingredients: ${ingredients}.
   Each recipe must be a JSON object with the followin fields:
  - name
  -image 
  - mealType (e.g., lunch, dinner, snack)
  - time (e.g., 30 minutes)
  - ingredients (as an array of strings)
  - instructions ( step-by-step string)
  Return only a valid JSON array of 3 such recipes- no extra text,no markdown. `;
  }; 