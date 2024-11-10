// Enumeration for card themes
// This enum defines three possible themes for a card: Light, Dark, and Blue.
// Enums allow for easily referencing specific themes in the game.
export enum CardTheme {
  Light = "light",  // Represents a light-colored theme for a card
  Dark = "dark",    // Represents a dark-colored theme for a card
  Blue = "blue",    // Represents a blue-colored theme for a card
}

// Card interface defining the structure of each card
// Interfaces in TypeScript define the shape of an object and enforce that
// every card object must have these properties with the specified types.
export interface Card {
  id: number;           // Unique identifier for each card, using a number data type
  symbol: string;       // Text or symbol displayed on the card, using a string data type
  isMatched: boolean;   // Boolean indicating if the card has been matched with its pair
  isFlipped: boolean;   // Boolean indicating if the card is currently flipped face-up
  theme: CardTheme;     // The theme of the card, using the CardTheme enum for specific values
}

// Function to create a card with default properties
// This function acts as a factory for creating Card objects, using specific values for
// properties such as ID, symbol, and theme. It returns an object that matches the Card interface.
export const createCard = (id: number, symbol: string, theme: CardTheme = CardTheme.Light): Card => {
  return {
    id,                  // ID for identifying each card uniquely
    symbol,              // Symbol to display on the card
    isMatched: false,    // Initializes each card as unmatched
    isFlipped: false,    // Initializes each card as face-down (not flipped)
    theme,               // Assigns the theme to the card, with Light as the default
  };
};