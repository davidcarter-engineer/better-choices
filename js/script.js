/*
  Better Choices - JavaScript (Week 3 Refactor)
  This file uses:
  - Variables
  - Arrays
  - Loops
  - Arrow Functions
  - Objects
  - JSON concepts
  - Math.random()
*/

// --- OBJECTS ---
// An object stores related data together using key-value pairs.
// Each key is a property name, and each value is the data for that property.
// Example: { name: "Subway", healthyScore: 8 }
// You access values with dot notation: restaurant.name

// --- ARRAY OF OBJECTS ---
// Instead of storing just names, we now store full restaurant details.
// Each item in the array is an object with multiple properties.
const restaurants = [
  { name: "McDonald's", healthyScore: 5, recommendedMeal: "Grilled Chicken Sandwich", calories: 380 },
  { name: "Subway", healthyScore: 8, recommendedMeal: "Veggie Delight Sub", calories: 230 },
  { name: "Chipotle", healthyScore: 7, recommendedMeal: "Chicken Burrito Bowl", calories: 510 },
  { name: "Chick-fil-A", healthyScore: 6, recommendedMeal: "Grilled Nuggets", calories: 140 },
  { name: "Wendy's", healthyScore: 5, recommendedMeal: "Apple Pecan Salad", calories: 340 },
  { name: "Taco Bell", healthyScore: 4, recommendedMeal: "Black Bean Crunchwrap", calories: 450 }
];

/*
  --- JSON (JavaScript Object Notation) ---
  JSON is a text format for storing and sharing data.
  It looks almost identical to JavaScript objects, but:
  - All keys must be in double quotes: { "name": "Subway" }
  - It is just text (a string), not a live JavaScript object.

  To convert an object to JSON text:    JSON.stringify(restaurants)
  To convert JSON text back to object:  JSON.parse(jsonString)

  We use objects directly here, but JSON is how data is stored or sent between systems.
*/

// --- ARROW FUNCTION ---
// This function loops through the array of objects and builds restaurant cards.
const displayRestaurants = () => {
  let cardsHTML = "";

  // --- LOOP ---
  // Each time through the loop, "restaurants[i]" is one object.
  // We use dot notation to access each property of that object.
  for (let i = 0; i < restaurants.length; i++) {
    cardsHTML +=
      '<article class="restaurant-card">' +
        '<h4>' + restaurants[i].name + '</h4>' +
        '<p class="card-detail">⭐ Healthy Score: ' + restaurants[i].healthyScore + '/10</p>' +
        '<p class="card-detail">🥗 Try: ' + restaurants[i].recommendedMeal + '</p>' +
        '<p class="card-detail">🔥 ' + restaurants[i].calories + ' calories</p>' +
      '</article>';
  }

  document.getElementById("restaurant-grid").innerHTML = cardsHTML;
};

// --- ARROW FUNCTION + Math.random() ---
// Picks a random restaurant object and returns a formatted string.
const getHealthyPick = () => {
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  const pick = restaurants[randomIndex];

  // Access multiple properties of the picked object to build the result.
  return pick.name + " — try the " + pick.recommendedMeal + " (" + pick.calories + " cal)";
};

// --- RUN ON PAGE LOAD ---
displayRestaurants();

const healthyPick = getHealthyPick();
document.getElementById("healthy-pick-result").textContent = healthyPick;
