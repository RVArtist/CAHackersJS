const form = document.getElementById('recipe-search');
const baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?'

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getRecipeData();
});
const recipeImage = document.getElementById('recipe-img');
// If no recipe image present, hide the parent div from DOM
if (recipeImage.src === '') {
  recipeImage.parentElement.style.display = 'none';
}
// Core functions
function populateData(data) {
  recipeImage.parentElement.style.display = ''; // remove the style="none" for containing div when we pass img element an image
  const ingredientsDiv = document.querySelector('.ingredients');
  const {
    image,
    title,
    instructions,
    summary: recipeSummary,
    extendedIngredients: ingredients,
  } = data.recipes[0]; // destructure data

  // Clears previous text if the ingredientsDiv already contains text (list items)
  if (ingredientsDiv.innerText !== '') {
    ingredientsDiv.innerText = '';
  }

  document.getElementById('recipe-name').innerText = title;
  document.querySelector('.summary').innerHTML = recipeSummary;
  recipeImage.src = image;
  // extended ingredients (list of objects) -> append each ingredient to a list in div .ingredients

  // Add each ingredient into the ingredientsDiv DOM div
  const ul = document.createElement('ul');
  ingredientsDiv.appendChild(ul);

  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.innerText = ingredient.original;
    ul.appendChild(li);
  });
}

function getRecipeData() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '95bf4e37b4mshe8cb692a716b2e3p190df5jsnb5e4f313f0e0',
    },
  };

  fetch(requestUrl(), options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.recipes[0]); // TEMPORARY --> console.log the object in the data payload
      populateData(data); // Pass the parsed json (data) to populateData function
    })
    .catch((err) => console.error(err));
}

// create request URL function assigns to a variable
let requestUrl = function () {
  const tags = document.getElementById('tags');
  const paramString = tags.value.replace(/ /g,"%20");
  
  const recipeNum = document.getElementById('amount');
  const amount = recipeNum.value;

  return baseUrl + 'tags=' + paramString + '&number=' + amount;
}

// create error handlinng function
function handleError(error) {
  console.log(error.message);
  document.getElementById(
    'main-section'
    ).innerHTML = `<p style='color: red'>Something went wrong, try again</p>`
}