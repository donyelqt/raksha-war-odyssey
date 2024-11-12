# Raksha: War Odyssey - Instructions

## 📖 Game Overview

**Raksha: War Odyssey** is a turn-based strategy board game where each player controls two unique characters and aims to capture the opponent's castle by strategically moving characters across the board and utilizing special skills.

### 🎮 Players:
- 2 players, each controlling 2 unique characters and a castle.

### ⚔️ Game Mechanics:
1. **Attack**: Characters can attack another character or the enemy castle.
   - If a character is eliminated, it will be reset to its initial position on the board.
   
2. **Move**: Characters and the castle can move to an adjacent unoccupied square on the board.
   - Movement can happen in any direction (horizontally, vertically, or diagonally).

3. **Skill**: Each character has a unique set of skills, some of which trigger objects or actions under certain conditions.

### 🏆 Goal:
Capture the enemy's castle by issuing an attack from one of your characters during your turn.

---

## 🎮 Game Modes

### PVP Battle Mode:
1. **Setting Up**: 
   - Player 1 is randomly selected to choose their first character, followed by Player 2, until each player has 2 characters.

2. **Game Start**:
   - The game begins once a player makes their first action.

3. **Turn Timer**:
   - Players have a **10-second** timer to make their move or action. If the timer expires, the player loses the turn.

### Bot Battle Mode:
1. **Setting Up**:
   - Choose the bot engine for Player 1 and Player 2 from a dropdown in the home screen.

2. **Game Start**:
   - The game starts once the bot action engine is selected.

3. **Turn Timer**:
   - Players are given **3 seconds** to make a move or action.

4. **Bot Battle Rules**:
   - A "Bot Battle" is a best-of-7 match. Leaderboards are updated weekly.
   - Players must submit an action to the game engine in **less than 1 second**. Each action is validated, and invalid actions result in turn violations.

---

## ⚖️ Game Rules

1. **Invalid Move**:
   - A move is invalid if:
     - The target square is occupied.
     - The target square is not within 1 square distance (horizontally, vertically, diagonally).
     
2. **Invalid Skill**:
   - A skill is invalid if:
     - The target square contains another skill object within 1 square distance.
     - The target square is out of range.

3. **Turn Violations**:
   - If a player performs 3 consecutive invalid actions, they lose the game.

---

## 📜 Bot Battle Rules

### Board Layout:
- 9x9 grid.
- Coordinates range from (0,0) to (8,8).

### Bot Battle Actions:
- Use the provided `move()`, `attack()`, and `skill()` functions with the correct parameters.
- All actions are validated through a Promise that returns `true` (valid) or `false` (invalid).
- Learning models such as A.I. are not allowed.
- External libraries are not permitted.

---

## 🛠️ Tech Stack

This game is built using the **MERN Stack**, utilizing **React Vite**, **Tailwind CSS**, and **TypeScript** for the frontend.

### **Frontend**:
- **React Vite**: Modern JavaScript build tool, which provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework to style the components.
- **TypeScript**: A superset of JavaScript for type safety.

---

/raksha-war-odyssey
|-- /public
|   |-- index.html          # Main HTML file
|   |-- /assets             # Images and other assets
|
|-- /src
|   |-- /components         # Reusable React components (e.g., GameBoard, Character, etc.)
|   |-- /services           # APIs and game logic
|   |-- /pages              # Pages for the app (e.g., HomePage, GamePage, etc.)
|   |-- /store              # Redux store or any state management
|   |-- /styles             # Global styles (Tailwind configuration, custom styles)
|   |-- App.tsx             # Main React App component
|   |-- index.tsx           # Entry point for React app
|
|-- /server
|   |-- /controllers        # Game logic for backend (match, player actions, etc.)
|   |-- /models             # MongoDB models for user data, game data, etc.
|   |-- /routes             # API routes for game logic
|   |-- server.ts           # Express server setup
|
|-- package.json            # Project dependencies and scripts
|-- tsconfig.json           # TypeScript configuration
|-- tailwind.config.js      # Tailwind configuration
|-- .gitignore              # Git ignore file
