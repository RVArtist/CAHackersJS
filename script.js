// Listen for button click to initiate Fetch process
const btn = document
  .getElementById('get-recipes')
  .addEventListener('click', getRecipeData);
const recipeImage = document.getElementById('recipe-img');
// Base URL for Fetch request
const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?';

if (recipeImage.src === '') {
  recipeImage.parentElement.style.display = 'none';
}

// Core functions
function populateData(data) {
  // target DOM elements
  const recipeName = document.getElementById('recipe-name');
  recipeImage.parentElement.style.display = ''; // remove the style="none" when we pass it in an image

  const { image, title } = data.recipes[0]; // destructure data
  recipeImage.src = image;
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
      console.log(data.recipes[0]); // TEMPORARY --> console.log the object in the data payload
      populateData(data); // Pass the parsed json (data) to populateData function
    })
    .catch((err) => console.error(err));
}
