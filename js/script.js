/*
  Better Choices - JavaScript (Week 4: DOM Manipulation & Events)

  This file uses:
  - Variables, Arrays, Objects
  - Loops, Arrow Functions
  - Math.random()
  - DOM Manipulation (querySelector, createElement, appendChild, textContent, innerHTML)
  - Event Listeners (addEventListener)
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
