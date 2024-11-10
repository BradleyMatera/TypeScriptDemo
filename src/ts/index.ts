// Import necessary functions and types from the Game module
// - initializeGame: Sets up the initial game state with shuffled cards
// - flipCard: Handles the logic for flipping a card
// - resetGame: Resets the game to its initial state
// - GameState: Type representing the structure of the game state
// - GameStatus: Enum for game statuses (Playing, Won, Lost)
import { initializeGame, flipCard, resetGame, GameState, GameStatus } from "./Game";
import { Card } from "./Card"; // Import Card interface for card-specific properties

// Main function to render game UI based on the current game state
function renderGame(gameState: GameState): void {
  // Get references to HTML containers for game elements
  const gameContainer = document.getElementById("game-container");
  const attemptsContainer = document.getElementById("attempts-container");
  const scoreContainer = document.getElementById("score-container");
  const statusContainer = document.getElementById("status-container");

  // Check that all necessary containers are present on the page
  if (gameContainer && attemptsContainer && scoreContainer && statusContainer) {
    gameContainer.innerHTML = ""; // Clear previous game content

    // Create a container element for the grid of cards
    const cardGrid = document.createElement("div");
    cardGrid.className = "card-grid"; // CSS class for grid layout

    // Loop through each card in the game state and render them
    gameState.cards.forEach((card: Card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card"; // Base class for card styling
      cardElement.classList.toggle("flipped", card.isFlipped); // Toggle flipped style if card is flipped

      // Front and back faces of the card
      const cardFront = document.createElement("div");
      cardFront.className = "card-front"; // Front face of the card (visible when flipped)
      cardFront.innerText = card.symbol; // Display card symbol on the front face

      const cardBack = document.createElement("div");
      cardBack.className = "card-back"; // Back face of the card (visible when not flipped)

      // Add front and back faces to the card element
      cardElement.appendChild(cardFront);
      cardElement.appendChild(cardBack);

      // Add click event listener to handle card flipping
      cardElement.addEventListener("click", () => {
        // Ensure game is in progress and card is not already flipped
        if (gameState.status === GameStatus.Playing && !card.isFlipped) {
          flipCard(gameState, card.id); // Flip the selected card
          updateGame(gameState); // Update game state after flipping
        }
      });

      // Add the card element to the grid
      cardGrid.appendChild(cardElement);
    });

    // Append the grid of cards to the main game container
    gameContainer.appendChild(cardGrid);

    // Update the display for remaining attempts, score, and status
    attemptsContainer.innerText = `Attempts Left: ${gameState.attemptsLeft}`;
    scoreContainer.innerText = `Score: ${gameState.score}`;
    statusContainer.innerText = `Status: ${gameState.status}`;
  }
}

// Function to refresh the game UI and check for game completion
function updateGame(gameState: GameState): void {
  renderGame(gameState); // Re-render the game with updated state

  // Display messages for game outcome based on status
  if (gameState.status === GameStatus.Won) {
    alert("Congratulations! You've matched all pairs!"); // Win message
  } else if (gameState.status === GameStatus.Lost) {
    alert("Game Over! You've used all attempts."); // Loss message
  }
}

// Initial setup function for starting and resetting the game
function setupGame(): void {
  const gameState = initializeGame(); // Initialize a new game state
  renderGame(gameState); // Render the initial game UI

  // Attach click event listener to the restart button
  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      resetGame(gameState); // Reset the game state
      renderGame(gameState); // Re-render UI after reset
    });
  }
}

// Ensure setupGame is called once the window has loaded
window.onload = setupGame;