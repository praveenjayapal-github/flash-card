let flashcards = [];
let currentIndex = 0;
let showingAnswer = false;
let category = "";
let challenges = "";

$(document).ready(function () {
  // Get category from URL
  const urlParams = new URLSearchParams(window.location.search);
  category = urlParams.get("category");
  challenges = urlParams.get("noOfChallenges");

  if (!category) {
    alert("No category selected.");
    return;
  }

  $("#category-title").text(`Category: ${category}`);

  // Load flashcard list from JSON
  $.getJSON(`data/${category}.json`, function (data) {
    flashcards = data;
    showFlashcard();
  }).fail(function () {
    alert("Failed to load flashcards for category: " + category);
  });

  // Image click toggles between question and answer
  $("#flashcard").click(function () {
    showingAnswer = !showingAnswer;
    showFlashcard();
  });

  // Navigation buttons
  $("#next-btn").click(function () {
    if (currentIndex < flashcards.length - 1) {
      currentIndex++;
      showingAnswer = false;
      showFlashcard();
    }
  });

  $("#prev-btn").click(function () {
    if (currentIndex > 0) {
      currentIndex--;
      showingAnswer = false;
      showFlashcard();
    }
  });

  $('#home-btn').click(function () {
    window.location.href = `index.html`;
  });
});

function showFlashcard() {
  if (!flashcards.length) return;

  currentIndex = (Math.floor(Math.random() * challenges)) + 1;
  const baseName = flashcards[currentIndex];
  const suffix = showingAnswer ? "_a" : "_q";
  imagePath = `images/${category}/${baseName}${suffix}.jpg`;

  if (category == "flags") imagePath = `images/${category}/${baseName}.jpg`;

  // Fade transition
  $("#flashcard").fadeOut(200, function () {
    $(this).attr("src", imagePath).attr("alt", baseName).fadeIn(200);
  });

  // Update progress bar
  const progressPercent = ((currentIndex + 1) / flashcards.length) * 100;
  $("#progress-bar").css("width", `${progressPercent}%`);
}