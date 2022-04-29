// DOM Elements for Manipulation
const btn = document
  .getElementById('get-recipes')
  .addEventListener('click', getRecipeData);
const recipeImage = document.getElementById('recipe-img');
const recipeName = document.getElementById('recipe-name');
// Base URL for Fetch Request
const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?';

// Core functions
function populateData(data) {
  const { image, title } = data.recipes[0];
  recipeImage.src = image;
  console.log(title);
  recipeName.innerText = title;
}

function getRecipeData() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '95bf4e37b4mshe8cb692a716b2e3p190df5jsnb5e4f313f0e0',
    },
  };

  fetch(`${baseUrl}number=1&tags=vegetarian%2Cdessert`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.recipes[0]); // TEMPORARY --> show the objects properties
      populateData(data); // Pass the parsed json (data) to populateData function
    })
    .catch((err) => console.error(err));
}
