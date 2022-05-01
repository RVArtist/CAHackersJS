const form = document.getElementById('recipe-search');
const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?';

const featureColours = {
  vegetarian: '#BEBEB0',
  vegan: '#00FF00',
  glutenFree: '#F563B1',
  dairyFree: '#F04F3F',
  veryHealthy: '#C8B76F',
  cheap: '#8574FF',
  veryPopular: '#55ACFF',
  sustainable: '#CDBC72',
  weightWatcherSmartPoints: '#8874FF',
  gaps: '#A75545',
  lowFodmap: '#BFCE20',
  aggregateLikes: '#C2C1D4',
  spoonacularScore: '#9D9AD5',
  healthScore: '#FDE03E',
  pricePerServing: '#C4C2DA',
};

function createFeatureBadges(data){
let initial =""
for (const [key, value] of Object.entries(data)) {
  if(value === true){
    initial+= `<span class='badge badge-pill badge-primary increase-size' style= "background-color: ${featureColours[key]};">${key}</span>`;
  }
}
return initial;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getRecipeData();
});


// create request URL function assigns to a variable
let requestUrl = function () {
  const tags = document.getElementById('tags');
  const paramString = tags.value.replace(/ /g, '%20');

  const recipeNum = document.getElementById('amount');
  const amount = recipeNum.value;

  return baseUrl + 'tags=' + paramString + '&number=' + amount;
};


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
    .then((data) => createCards(data))
    .catch(handleError)
    .finally(() => ((tags.value = ''), (amount.value = '')));
}


// create error handlinng function
function handleError(error) {
  console.log(error.message);
  document.getElementById(
    'main-section'
  ).innerHTML = `<p style='color: red'>Something went wrong, try again</p>`;
}

// create cards generator function
function createCards(data) {
  console.log(data.recipes);
  document.getElementById('cards-container').innerHTML = ''; // clean all previous cards

  for (i in data.recipes) {
    const { title, image } = data.recipes[i];
    console.log(title);
    document.getElementById('cards-container').innerHTML += `
    <div class="cards col mb-4">
      <div class="card border-dark h-100">
      <div class="card-header" mb-2>${title}</div>
      <img src=${image} class="thumbnail card-img-top" alt="recipe image" />
      <div class="card-body d-flex justify-content-center ">
        <button class="btn btn-outline-success" type="button">More Details</button>
      </div>
    </div>
    `;
  }
}

// create card details function
const button = document
  .querySelector('button')
  .addEventListener('click', (event) => {
    // need to show clicked card details- pls change it
          //populateData(data); // Pass the parsed json (data) to populateData function
    console.log('show more recipe details of the card');
  });

// document.getElementById('main-section').style.display = "none";
// const recipeImage = document.getElementById('recipe-img');
// // If no recipe image present, hide the parent div from DOM
// if (recipeImage.src === '') {
//   recipeImage.parentElement.style.display = 'none';
// }
// Core functions
function populateData(data) {
  recipeImage.parentElement.style.display = ''; // remove the style="none" for containing div when we pass img element an image
  document.getElementById('main-section').style.display = "block";
  const ingredientsDiv = document.querySelector('.ingredients');
  const {
    image,
    title,
    instructions,
    summary: recipeSummary,
    extendedIngredients: ingredients
  } = data.recipes[0]; // destructure data

  // Clears previous text if the ingredientsDiv already contains text (list items)
  if (ingredientsDiv.innerText !== '') {
    ingredientsDiv.innerText = '';
  }

  document.getElementById('recipe-name').innerText = title;
  document.getElementById('summary-title').innerText = "Summary";
    //Adds badges for recipe features
  document.getElementById('feature-badges').innerHTML = `${createFeatureBadges(data.recipes[0])}`;
  document.querySelector('.summary').innerHTML = recipeSummary;
  document.getElementById('instruction-title').innerText = "Cooking Instructions";
  document.querySelector('.instructions').innerHTML = instructions;
  recipeImage.src = image;
  // extended ingredients (list of objects) -> append each ingredient to a list in div .ingredients

  document.getElementById('ingredient-title').innerText = "Ingredients";
  // Add each ingredient into the ingredientsDiv DOM div
  const ul = document.createElement('ul');
  ingredientsDiv.appendChild(ul);

  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.innerText = ingredient.original;
    ul.appendChild(li);
  });
}
