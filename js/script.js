/*
  Better Choices - Beginner JavaScript
  This file uses only:
  - Variables
  - Functions
  - Math.random()
  - Conditional statements
*/

// These six variables store each restaurant name.
var restaurantOne = "McDonald's";
var restaurantTwo = "Subway";
var restaurantThree = "Chipotle";
var restaurantFour = "Chick-fil-A";
var restaurantFive = "Wendy's";
var restaurantSix = "Taco Bell";

/*
  getHealthyPick()
  - This function chooses one restaurant name.
  - It first creates a random whole number from 1 to 6.
  - Then it uses if / else if / else statements to decide which variable to return.
*/
function getHealthyPick() {
  // Math.random() creates a decimal number between 0 and 1.
  // Multiplying by 6 gives a number between 0 and just under 6.
  // Math.floor() removes the decimal so we get 0, 1, 2, 3, 4, or 5.
  // Adding 1 changes that range to 1 through 6.
  var randomNumber = Math.floor(Math.random() * 6) + 1;

  // Conditional logic decides which restaurant name to return.
  if (randomNumber === 1) {
    return restaurantOne;
  } else if (randomNumber === 2) {
    return restaurantTwo;
  } else if (randomNumber === 3) {
    return restaurantThree;
  } else if (randomNumber === 4) {
    return restaurantFour;
  } else if (randomNumber === 5) {
    return restaurantFive;
  } else {
    return restaurantSix;
  }
}

// This variable stores the final healthy pick returned by the function.
var healthyPick = getHealthyPick();
