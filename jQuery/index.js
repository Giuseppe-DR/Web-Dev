// Ensure the DOM is fully loaded before executing the script
$(document).ready(function () {
  // Select all <h1> elements on the page
  $("h1")
    // Change the CSS color property of the selected <h1> elements to red
    .css("color", "red");
});
