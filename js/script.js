/*
  Better Choices - JavaScript (Week 5: Async, Fetch API, Promises)

  This file uses:
  - Variables, Arrays, Objects
  - Loops, Arrow Functions
  - Math.random()
  - DOM Manipulation (querySelector, createElement, appendChild, textContent, innerHTML)
  - Event Listeners (addEventListener)
  - Fetch API, Async/Await, Promises, try/catch
*/

/*
  --- WHAT IS THE DOM? ---
  The DOM (Document Object Model) is the browser's representation of the HTML page.
  It turns your HTML into a tree of "nodes" (elements) that JavaScript can read and change.
  When we use querySelector() or getElementById(), we are reaching into the DOM
  to grab an element so we can modify it with JavaScript.
*/

// --- ARRAY OF OBJECTS ---
// Each restaurant is an object with properties describing it.
const restaurants = [
  { name: "McDonald's", healthyScore: 5, recommendedMeal: "Grilled Chicken Sandwich", calories: 380 },
  { name: "Subway", healthyScore: 8, recommendedMeal: "Veggie Delight Sub", calories: 230 },
  { name: "Chipotle", healthyScore: 7, recommendedMeal: "Chicken Burrito Bowl", calories: 510 },
  { name: "Chick-fil-A", healthyScore: 6, recommendedMeal: "Grilled Nuggets", calories: 140 },
  { name: "Wendy's", healthyScore: 5, recommendedMeal: "Apple Pecan Salad", calories: 340 },
  { name: "Taco Bell", healthyScore: 4, recommendedMeal: "Black Bean Crunchwrap", calories: 450 }
];

// --- FAVORITES ARRAY ---
// This array will hold the names of restaurants the user has favorited.
// We use it to prevent duplicates and track the count.
const favorites = [];

/*
  --- querySelector() ---
  querySelector() finds the FIRST element in the DOM that matches a CSS selector.
  We use it here to grab references to elements we'll update later.
*/
const restaurantGrid = document.querySelector("#restaurant-grid");
const favoritesGrid = document.querySelector("#favorites-grid");
const favoritesCounter = document.querySelector("#favorites-counter");

/*
  --- HOW EVENT LISTENERS WORK ---
  An event listener "listens" for something to happen (like a click).
  When that event occurs, it runs a function you provide.
  Syntax: element.addEventListener("click", functionToRun)
  The function runs ONLY when the user performs the action — not immediately.
*/

// --- DISPLAY RESTAURANTS ---
// This function builds restaurant cards and adds a "Add to Favorites" button to each.
const displayRestaurants = () => {
  let cardsHTML = "";

  for (let i = 0; i < restaurants.length; i++) {
    cardsHTML +=
      '<article class="restaurant-card">' +
        '<h4>' + restaurants[i].name + '</h4>' +
        '<p class="card-detail">⭐ Healthy Score: ' + restaurants[i].healthyScore + '/10</p>' +
        '<p class="card-detail">🥗 Try: ' + restaurants[i].recommendedMeal + '</p>' +
        '<p class="card-detail">🔥 ' + restaurants[i].calories + ' calories</p>' +
        '<button class="fav-btn" data-index="' + i + '">❤️ Add to Favorites</button>' +
      '</article>';
  }

  // --- innerHTML ---
  // innerHTML sets ALL of the HTML content inside an element at once.
  restaurantGrid.innerHTML = cardsHTML;

  /*
    --- querySelectorAll() ---
    querySelectorAll() finds ALL elements that match a CSS selector.
    It returns a NodeList (similar to an array) that we can loop through.
  */
  const allFavButtons = document.querySelectorAll(".fav-btn");

  // Loop through every button and attach a click event listener.
  for (let i = 0; i < allFavButtons.length; i++) {
    allFavButtons[i].addEventListener("click", () => {
      // "data-index" stores which restaurant this button belongs to.
      const index = allFavButtons[i].getAttribute("data-index");
      addToFavorites(index);
    });
  }
};

/*
  --- ADD TO FAVORITES ---
  This function is called when a user clicks a favorite button.
  It checks for duplicates, then creates a new card in the favorites section.
*/
const addToFavorites = (index) => {
  const restaurant = restaurants[index];

  // --- PREVENT DUPLICATES ---
  // Check if this restaurant name is already in the favorites array.
  if (favorites.indexOf(restaurant.name) !== -1) {
    console.log(restaurant.name + " is already in your favorites!");
    return; // Stop here — do not add again.
  }

  // Add the restaurant name to our tracking array.
  favorites.push(restaurant.name);

  /*
    --- createElement() ---
    createElement() creates a brand new HTML element in memory.
    It does NOT appear on the page until we use appendChild() to add it.
  */
  const card = document.createElement("article");
  card.className = "restaurant-card favorite-card";

  // --- innerHTML ---
  // Set the inner content of the new card element.
  card.innerHTML =
    '<h4>' + restaurant.name + '</h4>' +
    '<p class="card-detail">⭐ Healthy Score: ' + restaurant.healthyScore + '/10</p>' +
    '<p class="card-detail">🥗 Try: ' + restaurant.recommendedMeal + '</p>' +
    '<p class="card-detail">🔥 ' + restaurant.calories + ' calories</p>';

  /*
    --- appendChild() ---
    appendChild() takes an element and adds it as the last child inside another element.
    This is how we make our new card actually appear on the page.
  */
  favoritesGrid.appendChild(card);

  /*
    --- textContent ---
    textContent sets or gets the plain text inside an element.
    Unlike innerHTML, it does NOT parse HTML tags — just plain text.
  */
  favoritesCounter.textContent = "Favorites Saved: " + favorites.length;
};

// --- HEALTHY PICK OF THE DAY ---
const getHealthyPick = () => {
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  const pick = restaurants[randomIndex];
  return pick.name + " — try the " + pick.recommendedMeal + " (" + pick.calories + " cal)";
};

// --- RUN ON PAGE LOAD ---
displayRestaurants();

const healthyPick = getHealthyPick();
document.querySelector("#healthy-pick-result").textContent = healthyPick;

// ============================================================
// API CONFIGURATION
// ============================================================

/*
  --- API KEY ---
  The CalorieNinjas API requires a valid API key for authentication.
  You can get a FREE key by signing up at: https://calorieninjas.com/api

  HOW TO FIX:
  1. Go to https://calorieninjas.com/api
  2. Sign up for a free account
  3. Copy your API key from the dashboard
  4. Paste it below, replacing the placeholder text
*/
/*
  --- API CONFIGURATION ---
  We use the USDA FoodData Central API.
  It is completely free and returns full nutrition data (calories, protein, carbs, fat).
  Sign up for a free key at: https://fdc.nal.usda.gov/api-key-signup.html
*/
const API_KEY = "Xe8jaEePIn1B0wEN0eyuHChMVqWhdpnB7NxstOqE";
const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?pageSize=1&api_key=" + API_KEY + "&query=";

/*
  --- HELPER FUNCTION: extractNutrient() ---
  The USDA API returns nutrients in an array of objects.
  Each nutrient has a "nutrientName" and a "value".
  This helper searches the array and returns the value for a specific nutrient.
*/
const extractNutrient = (nutrients, name) => {
  for (let i = 0; i < nutrients.length; i++) {
    if (nutrients[i].nutrientName === name) {
      // For Energy, make sure we get KCAL not kJ.
      if (name === "Energy" && nutrients[i].unitName !== "KCAL") {
        continue;
      }
      return nutrients[i].value;
    }
  }
  return 0;
};

/*
  --- HELPER FUNCTION: parseFood() ---
  Takes a raw food object from the USDA API and returns a simplified object
  with just the fields we need for display and comparison.
*/
const parseFood = (food) => {
  const nutrients = food.foodNutrients;
  return {
    name: food.description.toLowerCase(),
    calories: extractNutrient(nutrients, "Energy"),
    protein_g: extractNutrient(nutrients, "Protein"),
    carbohydrates_total_g: extractNutrient(nutrients, "Carbohydrate, by difference"),
    fat_total_g: extractNutrient(nutrients, "Total lipid (fat)")
  };
};

// ============================================================
// NUTRITION LOOKUP FEATURE
// ============================================================

// Grab references to the Nutrition Lookup elements.
const foodInput = document.querySelector("#food-input");
const searchBtn = document.querySelector("#search-btn");
const nutritionResult = document.querySelector("#nutrition-result");

/*
  --- FETCH API ---
  fetch() is a built-in browser function that makes HTTP requests to a URL.
  It returns a Promise that resolves to the server's response.
  We then call response.json() to parse the JSON body into a JavaScript object.
*/

// This async arrow function searches for nutrition data.
const searchNutrition = async () => {
  const query = foodInput.value.trim();

  if (query === "") {
    nutritionResult.innerHTML = '<p class="nutrition-error">Please enter a food name.</p>';
    return;
  }

  // Show loading message.
  nutritionResult.innerHTML = '<p class="nutrition-loading">Searching for "' + query + '"...</p>';

  // Build the full URL so we can log it for debugging.
  const requestURL = API_URL + encodeURIComponent(query);

  // --- CONSOLE LOGGING: Show the URL being called ---
  console.log("--- NUTRITION LOOKUP DEBUG ---");
  console.log("Request URL:", requestURL);

  try {
    const response = await fetch(requestURL);

    // --- CONSOLE LOGGING: Show the response status code ---
    console.log("Response Status:", response.status);

    // --- SPECIFIC ERROR MESSAGES based on status code ---
    if (!response.ok) {
      console.log("Response Status Text:", response.statusText);

      if (response.status === 401 || response.status === 403) {
        // 401/403 means the API key is invalid or missing.
        nutritionResult.innerHTML =
          '<p class="nutrition-error">' +
            'API Key Error (Status ' + response.status + '): Your API key is invalid or expired.<br>' +
            'Fix: Get a free key at <a href="https://calorieninjas.com/api" target="_blank">calorieninjas.com/api</a> ' +
            'and update API_KEY in js/script.js.' +
          '</p>';
        return;
      } else if (response.status === 404) {
        nutritionResult.innerHTML = '<p class="nutrition-error">API endpoint not found (404). The URL may be incorrect.</p>';
        return;
      } else if (response.status === 429) {
        nutritionResult.innerHTML = '<p class="nutrition-error">Too many requests. Please wait a moment and try again.</p>';
        return;
      } else {
        nutritionResult.innerHTML = '<p class="nutrition-error">Server error (Status ' + response.status + '). Please try again later.</p>';
        return;
      }
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    // USDA returns { foods: [...] }. If the array is empty, no results found.
    if (!data.foods || data.foods.length === 0) {
      nutritionResult.innerHTML = '<p class="nutrition-error">No results found for "' + query + '". Try another food.</p>';
      return;
    }

    // Parse the first result into a simple object.
    const item = parseFood(data.foods[0]);

    const resultHTML =
      '<div class="nutrition-card">' +
        '<h4>' + item.name + '</h4>' +
        '<p class="card-detail">🔥 Calories: ' + item.calories + '</p>' +
        '<p class="card-detail">🥩 Protein: ' + item.protein_g + 'g</p>' +
        '<p class="card-detail">🍞 Carbs: ' + item.carbohydrates_total_g + 'g</p>' +
        '<p class="card-detail">🧈 Fat: ' + item.fat_total_g + 'g</p>' +
      '</div>';

    nutritionResult.innerHTML = resultHTML;
  } catch (error) {
    // --- CONSOLE LOGGING: Show full error details ---
    console.log("Fetch Error Type:", error.name);
    console.log("Fetch Error Message:", error.message);

    // Network errors (no internet, DNS failure, CORS blocked).
    nutritionResult.innerHTML =
      '<p class="nutrition-error">' +
        'Network Error: Could not reach the API.<br>' +
        'Check your internet connection or try again later.<br>' +
        '<small>Details: ' + error.message + '</small>' +
      '</p>';
  }
};

// --- EVENT LISTENER ---
// When the user clicks the Search button, run the searchNutrition function.
searchBtn.addEventListener("click", searchNutrition);

// ============================================================
// HEALTHY CHOICE COMPARISON FEATURE
// ============================================================

/*
  --- HOW THIS FEATURE WORKS ---
  1. The user types two food names into the input fields.
  2. When they click "Compare", we make TWO separate API requests (one per food).
  3. Both requests use fetch() with async/await.
  4. Once we have data for both foods, we compare their nutrition values.
  5. We calculate a Health Score and display a recommendation.
*/

// Grab references to the comparison elements.
const foodOneInput = document.querySelector("#food-one");
const foodTwoInput = document.querySelector("#food-two");
const compareBtn = document.querySelector("#compare-btn");
const comparisonResult = document.querySelector("#comparison-result");

/*
  --- HELPER FUNCTION: fetchFoodData() ---
  This async function fetches nutrition data for a single food item.
  It returns the first item from the API response, or null if not found.

  Why a separate function?
  We need to fetch data for TWO foods. Instead of writing the same fetch code
  twice, we create one reusable function and call it twice.
*/
const fetchFoodData = async (foodName) => {
  const requestURL = API_URL + encodeURIComponent(foodName);

  console.log("Fetching:", requestURL);

  const response = await fetch(requestURL);

  console.log("Response for \"" + foodName + "\":", response.status);

  if (!response.ok) {
    throw new Error("Status " + response.status + " for: " + foodName);
  }

  const data = await response.json();

  if (!data.foods || data.foods.length === 0) {
    return null;
  }
  return parseFood(data.foods[0]);
};

/*
  --- HELPER FUNCTION: calculateHealthScore() ---
  Generates a score from 1 to 10 based on nutrition data.
  Lower calories and fat = better score. Higher protein = better score.
  This is a simplified scoring system for demonstration purposes.
*/
const calculateHealthScore = (food) => {
  let score = 10;

  // Penalize for high calories (every 100 cal above 200 loses a point).
  if (food.calories > 200) {
    score = score - Math.floor((food.calories - 200) / 100);
  }

  // Penalize for high fat (every 10g above 10 loses a point).
  if (food.fat_total_g > 10) {
    score = score - Math.floor((food.fat_total_g - 10) / 10);
  }

  // Reward for high protein (every 15g above 10 adds a point).
  if (food.protein_g > 10) {
    score = score + Math.floor((food.protein_g - 10) / 15);
  }

  // Keep score between 1 and 10.
  if (score < 1) {
    score = 1;
  }
  if (score > 10) {
    score = 10;
  }

  return score;
};

/*
  --- MAIN COMPARISON FUNCTION ---
  This async function runs when the user clicks "Compare".
  It fetches data for both foods, calculates scores, and displays the result.
*/
const compareFoods = async () => {
  // Get user input and remove extra spaces.
  const foodOneName = foodOneInput.value.trim();
  const foodTwoName = foodTwoInput.value.trim();

  // --- ERROR HANDLING: Empty fields ---
  if (foodOneName === "" || foodTwoName === "") {
    comparisonResult.innerHTML = '<p class="nutrition-error">Please enter both food items to compare.</p>';
    return;
  }

  // Show a loading message while both API requests are in progress.
  comparisonResult.innerHTML = '<p class="nutrition-loading">Comparing "' + foodOneName + '" vs "' + foodTwoName + '"...</p>';

  console.log("--- COMPARISON DEBUG ---");

  try {
    const foodOne = await fetchFoodData(foodOneName);
    const foodTwo = await fetchFoodData(foodTwoName);

    // --- ERROR HANDLING: Food not found ---
    if (!foodOne && !foodTwo) {
      comparisonResult.innerHTML = '<p class="nutrition-error">Neither food was found. Please try different names.</p>';
      return;
    }
    if (!foodOne) {
      comparisonResult.innerHTML = '<p class="nutrition-error">"' + foodOneName + '" was not found. Try a different name.</p>';
      return;
    }
    if (!foodTwo) {
      comparisonResult.innerHTML = '<p class="nutrition-error">"' + foodTwoName + '" was not found. Try a different name.</p>';
      return;
    }

    // Calculate health scores for both foods.
    const scoreOne = calculateHealthScore(foodOne);
    const scoreTwo = calculateHealthScore(foodTwo);

    /*
      --- COMPARISON LOGIC ---
      We determine the "better choice" based on:
      - Lower calories (most important for general health)
      - Higher protein (keeps you full longer)
      - Lower fat
      We use a simple point system: each win earns 1 point.
    */
    let pointsOne = 0;
    let pointsTwo = 0;

    // Compare calories — lower is better.
    if (foodOne.calories < foodTwo.calories) {
      pointsOne = pointsOne + 1;
    } else if (foodTwo.calories < foodOne.calories) {
      pointsTwo = pointsTwo + 1;
    }

    // Compare protein — higher is better.
    if (foodOne.protein_g > foodTwo.protein_g) {
      pointsOne = pointsOne + 1;
    } else if (foodTwo.protein_g > foodOne.protein_g) {
      pointsTwo = pointsTwo + 1;
    }

    // Compare fat — lower is better.
    if (foodOne.fat_total_g < foodTwo.fat_total_g) {
      pointsOne = pointsOne + 1;
    } else if (foodTwo.fat_total_g < foodOne.fat_total_g) {
      pointsTwo = pointsTwo + 1;
    }

    // Determine which card gets the "winner" highlight.
    let winnerClass1 = "";
    let winnerClass2 = "";
    let verdictMessage = "";

    if (pointsOne > pointsTwo) {
      winnerClass1 = " winner";
      verdictMessage = "🌟 Better Choice: " + foodOne.name;
    } else if (pointsTwo > pointsOne) {
      winnerClass2 = " winner";
      verdictMessage = "🌟 Better Choice: " + foodTwo.name;
    } else {
      verdictMessage = "🤝 Both options are similar nutritional choices.";
    }

    // --- BUILD THE COMPARISON HTML ---
    const resultHTML =
      '<div class="compare-grid">' +
        '<div class="compare-card' + winnerClass1 + '">' +
          '<h4>' + foodOne.name + '</h4>' +
          '<p class="card-detail">🔥 Calories: ' + foodOne.calories + '</p>' +
          '<p class="card-detail">🥩 Protein: ' + foodOne.protein_g + 'g</p>' +
          '<p class="card-detail">🍞 Carbs: ' + foodOne.carbohydrates_total_g + 'g</p>' +
          '<p class="card-detail">🧈 Fat: ' + foodOne.fat_total_g + 'g</p>' +
          '<p class="health-score">⭐ Health Score: ' + scoreOne + '/10</p>' +
        '</div>' +
        '<div class="compare-card' + winnerClass2 + '">' +
          '<h4>' + foodTwo.name + '</h4>' +
          '<p class="card-detail">🔥 Calories: ' + foodTwo.calories + '</p>' +
          '<p class="card-detail">🥩 Protein: ' + foodTwo.protein_g + 'g</p>' +
          '<p class="card-detail">🍞 Carbs: ' + foodTwo.carbohydrates_total_g + 'g</p>' +
          '<p class="card-detail">🧈 Fat: ' + foodTwo.fat_total_g + 'g</p>' +
          '<p class="health-score">⭐ Health Score: ' + scoreTwo + '/10</p>' +
        '</div>' +
      '</div>' +
      '<div class="comparison-verdict">' + verdictMessage + '</div>';

    // Display the comparison on the page.
    comparisonResult.innerHTML = resultHTML;

  } catch (error) {
    // --- CONSOLE LOGGING: Show full error details ---
    console.log("Comparison Error Type:", error.name);
    console.log("Comparison Error Message:", error.message);

    // Show specific message based on error content.
    if (error.message.indexOf("Status 401") !== -1 || error.message.indexOf("Status 403") !== -1) {
      comparisonResult.innerHTML =
        '<p class="nutrition-error">' +
          'API Key Error: Your API key is invalid or expired.<br>' +
          'Fix: Get a free key at <a href="https://calorieninjas.com/api" target="_blank">calorieninjas.com/api</a> ' +
          'and update API_KEY in js/script.js.' +
        '</p>';
    } else {
      comparisonResult.innerHTML =
        '<p class="nutrition-error">' +
          'Could not complete comparison.<br>' +
          '<small>Details: ' + error.message + '</small>' +
        '</p>';
    }
  }
};

// --- EVENT LISTENER ---
// Listen for a click on the Compare button, then run compareFoods.
compareBtn.addEventListener("click", compareFoods);

// ============================================================
// FOOD DIARY FEATURE
// ============================================================

/*
  --- HOW THE FOOD DIARY WORKS ---
  1. The user enters a meal name, food item, and calorie count.
  2. When "Save Meal" is clicked, an event listener runs the saveMeal function.
  3. saveMeal() creates a new object and pushes it to the diary array.
  4. A new diary entry element is dynamically created and added to the page.
  5. The daily total calories are recalculated and updated on screen.
*/

// --- DIARY ARRAY ---
// This array stores all meal entries as objects.
// Each object has: mealName, foodItem, and calories.
const diary = [];

// --- DOM REFERENCES ---
// Grab references to the diary input fields, button, and display areas.
const mealNameInput = document.querySelector("#meal-name");
const foodItemInput = document.querySelector("#food-item");
const mealCaloriesInput = document.querySelector("#meal-calories");
const saveMealBtn = document.querySelector("#save-meal-btn");
const dailyTotalDisplay = document.querySelector("#daily-total");
const diaryEntries = document.querySelector("#diary-entries");

/*
  --- UPDATING TOTALS ---
  This function loops through every entry in the diary array,
  adds up all the calories, and updates the total on the page.
*/
const updateDailyTotal = () => {
  let total = 0;

  // Loop through the diary array and add each entry's calories.
  for (let i = 0; i < diary.length; i++) {
    total = total + diary[i].calories;
  }

  // Update the displayed total using textContent.
  dailyTotalDisplay.textContent = "Daily Total Calories: " + total;
};

/*
  --- SAVE MEAL FUNCTION ---
  This function runs when the user clicks "Save Meal".
  It reads the inputs, creates an object, stores it, and displays it.
*/
const saveMeal = () => {
  // Read values from the input fields.
  const mealName = mealNameInput.value.trim();
  const foodItem = foodItemInput.value.trim();
  const calories = parseInt(mealCaloriesInput.value);

  // Validate — make sure all fields are filled in and calories is a number.
  if (mealName === "" || foodItem === "" || isNaN(calories)) {
    console.log("Please fill in all fields with valid data.");
    return;
  }

  // --- CREATE AN OBJECT ---
  // Store the meal data as an object with three properties.
  const entry = {
    mealName: mealName,
    foodItem: foodItem,
    calories: calories
  };

  // Push the new entry object into the diary array.
  diary.push(entry);

  /*
    --- DYNAMIC CONTENT CREATION ---
    createElement() builds a new HTML element in memory.
    We set its class and innerHTML, then use appendChild() to add it to the page.
    This updates the page immediately without a refresh.
  */
  const entryCard = document.createElement("div");
  entryCard.className = "diary-entry";
  entryCard.innerHTML =
    '<h4>' + entry.mealName + '</h4>' +
    '<p class="card-detail">🍽️ ' + entry.foodItem + '</p>' +
    '<p class="card-detail">🔥 ' + entry.calories + ' calories</p>';

  // appendChild() adds the new entry to the diary section on the page.
  diaryEntries.appendChild(entryCard);

  // Update the daily total to include this new meal.
  updateDailyTotal();

  // Clear the input fields so the user can add another meal easily.
  mealNameInput.value = "";
  foodItemInput.value = "";
  mealCaloriesInput.value = "";
};

/*
  --- EVENT HANDLING ---
  addEventListener("click", saveMeal) tells the browser:
  "When the user clicks this button, run the saveMeal function."
  The function does NOT run immediately — only when the click happens.
*/
saveMealBtn.addEventListener("click", saveMeal);
