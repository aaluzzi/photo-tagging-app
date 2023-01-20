import './styles/App.css';

import { useEffect, useState } from 'react';

import StartModal from './components/StartModal'
import Leaderboard from './components/Leaderboard';
import GameBackground from './components/GameBackground';
import Header from './components/Header';
import EndModal from './components/EndModal';

import { fetchPokemon, signIn, getHighscoreDoc, submitHighscoreDoc, getHighscoreDocs} from './firebase';

function App() {
  const [status, setStatus] = useState("intro");
  const [startTime, setStartTime] = useState(null);
  const [scoreMillis, setScoreMillis] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [characters, setCharacters] = useState([]);

  //only triggers on doc load
  useEffect(() => {
    fetchPokemon().then(pokemon => setCharacters(pokemon));
    signIn()
      .then(() => getHighscoreDoc())
      .then(highScore => setHighScore(highScore));
  }, [])

  const showLeaderboard = () => {
    getHighscoreDocs().then(docs => {
      setHighScores(docs);
    }).then(() => {
      setStatus("leaderboard");
    })
  }

  const startGame = () => {
    setStatus("playing");
    setStartTime(Date.now());
  }

  useEffect(() => {
    if (status === "playing" && characters.every(character => character.found)) {
      setScoreMillis(Date.now() - startTime);
      setStatus("ended");
    }
  }, [characters])

  const findCharacter = (foundCharacter) => {
    setCharacters(characters.map(character => {
      if (character === foundCharacter) {
        return { ...character, found: true }
      } else {
        return character;
      }
    }));
  }

  const submitHighscore = (name, newHighScore) => {
    submitHighscoreDoc(name, newHighScore)
      .then(() => showLeaderboard());
  }
  //{status === "playing" ? <SelectBox onClick={onSelectBoxSelect} characters={characters} visible={selection.visible} x={selection.boxX} y={selection.boxY} /> : null}
  return (
    <div className="App">
      <Header status={status} characters={characters} />
      <GameBackground characters={characters} findCharacter={findCharacter} />
      {status === "leaderboard" ? <Leaderboard highScores={highScores} /> : null}
      {status === "intro" ? <StartModal showLeaderboard={showLeaderboard} startGame={startGame} characters={characters} /> : null}
      {status === "ended" ? <EndModal onSubmitHighScore={submitHighscore} scoreMillis={scoreMillis} highScore={highScore} /> : null}
    </div>
  );
}

export default App;
