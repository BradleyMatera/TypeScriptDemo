// Importing required elements from Card module
// - Card: Interface defining the structure of each card
// - createCard: Factory function to create card instances
// - CardTheme: Enum for card themes (Light, Dark, Blue)
import { Card, createCard, CardTheme } from "./Card";

// GameState interface describes the properties of the game's state
// - `cards`: Array of all cards in the game
// - `attemptsLeft`: Remaining attempts for the player
// - `status`: Current status of the game using GameStatus enum
// - `score`: Player’s score, incremented on successful matches
// - `flippedCards`: Currently flipped cards to track potential matches
export interface GameState {
  cards: Card[];
  attemptsLeft: number;
  status: GameStatus;
  score: number;
  flippedCards: Card[];
}

// Enum GameStatus represents possible game states
// - Enum restricts values to specific states for clarity
// - `Playing`: Game is in progress
// - `Won`: Game is completed successfully
// - `Lost`: Player ran out of attempts
export enum GameStatus {
  Playing = "Playing",
  Won = "Won",
  Lost = "Lost",
}

// Function to initialize a new game state
// - Symbols array represents paired symbols for card matching
// - Themes array provides color themes for cards
// - Uses createCard to generate Card objects and shuffle them
// - Returns an object that represents the initial GameState
export function initializeGame(): GameState {
  const symbols = ["A", "A", "B", "B", "C", "C"];
  const themes = [CardTheme.Light, CardTheme.Dark, CardTheme.Blue];
  const cards: Card[] = symbols.map((symbol, index) =>
    createCard(index + 1, symbol, themes[index % themes.length])
  );

  return {
    cards: shuffleCards(cards), // Shuffled array of Card objects
    attemptsLeft: 3, // Player has 3 attempts initially
    status: GameStatus.Playing, // Game starts in the Playing state
    score: 0, // Initial score is 0
    flippedCards: [], // No cards flipped initially
  };
}

// Shuffle function to randomize card order
// - Uses a `sortKey` to apply random sorting to each card
// - Returns a new array of shuffled cards
function shuffleCards(cards: Card[]): Card[] {
  return cards
    .map(card => ({ ...card, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...card }) => card);
}

// Function to flip a card and trigger game logic
// - Searches for card by `cardId` and toggles its flipped state
// - Adds card to `flippedCards` array
// - Calls `checkForMatch` if two cards are flipped
export function flipCard(gameState: GameState, cardId: number): void {
  const card = gameState.cards.find(c => c.id === cardId);
  if (card && !card.isMatched && !card.isFlipped) {
    card.isFlipped = true;
    gameState.flippedCards.push(card);

    // Check if two cards are flipped to verify match
    if (gameState.flippedCards.length === 2) {
      checkForMatch(gameState);
    }
  }
}

// Function to validate matches and update game status
// - If symbols match, mark cards as matched, increase score
// - If all cards are matched, set status to `Won`
// - Otherwise, flip cards back if no match and reduce attempts
function checkForMatch(gameState: GameState): void {
  const [card1, card2] = gameState.flippedCards;
  if (card1.symbol === card2.symbol) {
    card1.isMatched = true;
    card2.isMatched = true;
    gameState.score += 10;
    gameState.flippedCards = [];

    // Set status to Won if all cards are matched
    if (gameState.cards.every(card => card.isMatched)) {
      gameState.status = GameStatus.Won;
      alert("Congratulations! You've matched all pairs!"); // Win message
    }
  } else {
    // Delay flipping back to allow player to see flipped cards
    setTimeout(() => {
      card1.isFlipped = false;
      card2.isFlipped = false;
      gameState.flippedCards = [];
    }, 1000);

    gameState.attemptsLeft--;
    // End game if attempts reach 0
    if (gameState.attemptsLeft <= 0) {
      gameState.status = GameStatus.Lost;
      alert("Game Over! You've used all attempts."); // Loss message
    }
  }
}

// Function to reset the game to its initial state
// - Reinitializes all state properties to starting values
// - Clears flipped cards and resets attempts, status, score
export function resetGame(gameState: GameState): void {
  const initialState = initializeGame();
  gameState.cards = initialState.cards;
  gameState.attemptsLeft = initialState.attemptsLeft;
  gameState.status = initialState.status;
  gameState.score = initialState.score;
  gameState.flippedCards = [];
}