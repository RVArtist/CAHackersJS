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

// creates the pills for badge elements using template strings
function createFeatureBadges(data) {
  let initial = '';
  for (const [key, value] of Object.entries(data)) {
    if (value === true) {
      console.log(value);
      initial += `<span class='badge badge-pill badge-primary increase-size mx-1' style="background-color: ${featureColours[key]};">${key}</span>`;
    }
  }
  return initial;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getRecipeData();
});

// create request URL function & assigns to baseUrl variable
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
    .finally(() => ((tags.value = ''), (amount.value = ''))); // clears input fields after search
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
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; // clean all previous cards
  cardsContainer.className =
    'd-flex justify-content-center row row-cols-sm-1 row-cols-md-2 row-cols-lg-4'; // adds classes back when doing additional searches

  for (i in data.recipes) {
    const recipe = data.recipes[i]; // pass populateData function the full recipe[i] object
    const { title, image } = data.recipes[i];
    document.getElementById('cards-container').innerHTML += `
    <div class="cards col mb-4">
      <div class="card border-dark h-100">
      <div class="card-header" mb-2>${title}</div>
      <img src=${image} class="thumbnail card-img-top" alt="recipe image" />
      <div class="card-body d-flex justify-content-center ">
        <button class="more-details btn btn-outline-success" type="button">More Details</button>
      </div>
    </div>
    `;

    // event listeners for creating more-details layout
    // user can click either 'more-details' or the thumbnail img
    document
      .querySelector('.more-details')
      .addEventListener('click', (event) => {
        populateData(recipe);
      });

    document.querySelector('.thumbnail').addEventListener('click', (event) => {
      populateData(recipe);
    });
  }
}

/* populate divs with the data from the recipes object
 * reset any pre-existing HTML & classes (on cards-container) when ran again
 */
function populateData(data) {
  document.getElementById('main-section').style.display = 'block';

  const {
    image,
    title,
    instructions,
    summary: recipeSummary,
    extendedIngredients: ingredients,
  } = data; // destructure data

  document.getElementById('cards-container').className = ''; // reset class list for the new layout
  document.getElementById('cards-container').innerHTML = `
  <h1 id="recipe-name" style="text-align: center"></h1>
  <div id="feature-badges"></div>
  <div class="image-container">
    <img id="recipe-img" width="300" height="300" />
  </div>
  <div class="information">
    <div class="info-item-container">
      <h2 id="summary-title"></h2>
      <div class="summary"></div>
    </div>
    <div class="info-item-container">
      <h2 id="ingredient-title"></h2>
      <div class="ingredients"></div>
    </div>
    <div class="info-item-container">
      <h2 id="instruction-title"></h2>
      <div class="instructions"></div>
    </div>
  </div>
  `;

  const ingredientsDiv = document.querySelector('.ingredients');

  document.getElementById('recipe-img').src = image;
  document.getElementById('recipe-name').innerText = title;
  document.getElementById('summary-title').innerText = 'Summary';
  //Adds badges for recipe features
  document.getElementById('feature-badges').innerHTML = `${createFeatureBadges(
    data
  )}`;
  document.querySelector('.summary').innerHTML = recipeSummary;
  document.getElementById('instruction-title').innerText =
    'Cooking Instructions';
  document.querySelector('.instructions').innerHTML = instructions;
  // recipeImage.src = image;

  document.getElementById('ingredient-title').innerText = 'Ingredients';
  // Add each ingredient into the ingredientsDiv DOM div
  const ul = document.createElement('ul');
  ingredientsDiv.appendChild(ul);

  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.innerText = ingredient.original;
    ul.appendChild(li);
  });
}
