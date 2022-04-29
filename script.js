const form = document.getElementById('recipe-search');
const baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?'

form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '95bf4e37b4mshe8cb692a716b2e3p190df5jsnb5e4f313f0e0',
    }
  };
  
  fetch(requestUrl(), options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(handleError)
});

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