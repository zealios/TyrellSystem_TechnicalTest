const express = require('express');
const app = express();
const path = require('path');

function distributeCards(numPlayers) {
  if (numPlayers <= 0) {
    return { error: 'Invalid number of players' };
  }
  
  const suits = ['S', 'H', 'D', 'C'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
  const cards = [];
  
  // Create the deck of cards
  for (const suit of suits) {
    for (const rank of ranks) {
      cards.push(`${suit}-${rank}`);
    }
  }
  
  // Shuffle the deck of cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  // Distribute the cards among players
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push([]);
  }
  
  let currentPlayer = 0;
  while (cards.length > 0) {
    players[currentPlayer].push(cards.pop());
    currentPlayer = (currentPlayer + 1) % numPlayers;
  }
  
  // Return the result as JSON
  return { players };
}

app.get('/api/distribute-cards/:numPlayers', (req, res) => {
  const numPlayers = parseInt(req.params.numPlayers);
  const result = distributeCards(numPlayers);
  res.json(result);
});

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

