# Card Flip Memory Game

A fun, interactive memory game that challenges players to match pairs of cards. Built with TypeScript and JavaScript, this game focuses on clean, scalable code structure and modularity. Perfect for anyone wanting to test their memory skills!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Game Rules](#game-rules)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Flip Cards**: Players can flip two cards at a time.
- **Match Pairs**: Match pairs to score points and win the game.
- **Limited Attempts**: Game limits attempts, adding a layer of difficulty.
- **Win/Lose Alerts**: Alerts for winning or losing based on the number of attempts left.
- **Modular Code Structure**: Clean, reusable code that separates concerns.

## Technologies Used

- **JavaScript (ES6+)**
- **TypeScript**
- **HTML5** and **CSS3**
- **Module Bundler (e.g., Vite)**

---

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/card-flip-game.git
    cd card-flip-game
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the game locally:**
    ```bash
    npm run dev
    ```

4. **Build for production:**
    ```bash
    npm run build
    ```

---

## Game Rules

1. Flip two cards.
2. If the symbols match, they stay flipped, and you earn points.
3. If the symbols don’t match, the cards will flip back over.
4. Match all pairs to win the game.
5. You lose if you run out of attempts before matching all pairs.

---

## File Structure

├── public
│   ├── index.html
│   └── assets/
├── src
│   ├── ts/
│   │   ├── Card.ts
│   │   ├── Game.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── main.scss
│   ├── assets/
│   │   └── images/
│   └── README.md
└── package.json

- `Card.ts`: Defines card properties and themes.
- `Game.ts`: Handles game state, matching logic, attempts, and game reset.
- `index.ts`: Manages the DOM rendering and game setup.
- `main.scss`: Contains styles for the game, such as layout and animations.

---

## Usage

1. **Start a New Game**: When the game loads, a new game state is automatically initialized.
2. **Flip Cards**: Click on any card to flip it.
3. **Match Cards**: Try to remember card positions to match pairs.
4. **Track Attempts and Score**: Each attempt and score is displayed in real time.
5. **Restart Game**: Press the restart button to start over.

### Example Code

```typescript
import { initializeGame, flipCard, resetGame, GameState, GameStatus } from "./Game";
import { Card } from "./Card";

function renderGame(gameState: GameState): void {
  // DOM manipulation and game rendering code
  const gameContainer = document.getElementById("game-container");
  // ...other code
}
