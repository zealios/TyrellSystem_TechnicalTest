import React, { useState, useEffect } from 'react';
import Card from './components/card'
import Toast from './components/toast';

const App = () => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [result, setResult] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const handleNumPlayersChange = (e) => {
    setNumPlayers(e.target.value);
  };

  const handleDistributeCards = async () => {
    if (parseInt(numPlayers) <= 0) {
      setToastMessage('ERROR: Invalid number of player. Must bigger then 0');
    } else {
      try {
        const response = await fetch(`/api/distribute-cards/${numPlayers}`);
        const data = await response.json();
        setResult(data.players);
        setToastMessage(`Successfully distribute cards to ${numPlayers} players`);
      } catch (error) {
        setToastMessage(`ERROR: ${error}`);
      }
    }
  };

  const renderPlayerCards = () => {
    return result.map((player, index) => (
      <div key={index} className="border rounded p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Player {index + 1}</h2>
        <div className="flex">
          {player.map((card, idx) => (
            <Card key={idx} text={card} />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Card Distribution</h1>
      <div className="mb-4">
        <label htmlFor="numPlayers" className="mr-2">
          Number of Players:
        </label>
        <input
          type="number"
          id="numPlayers"
          value={numPlayers}
          onChange={handleNumPlayersChange}
          className="border rounded p-2"
        />
      </div>
      <button onClick={handleDistributeCards} className="bg-blue-500 text-white py-2 px-4 rounded">
        Distribute Cards
      </button>
      <Toast message={toastMessage} onClose={() => { setToastMessage(''); }} />
      <div className="mt-8">{renderPlayerCards()}</div>
    </div>
  );
};

export default App;
