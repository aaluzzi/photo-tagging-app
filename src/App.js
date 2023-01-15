import './App.css';

import { useEffect, useState } from 'react';

import StartModal from './components/StartModal'
import Leaderboard from './components/Leaderboard';
import GameBackground from './components/GameBackground';
import Header from './components/Header';
import SelectBox from "./components/SelectBox";
import EndModal from './components/EndModal';

import { fetchPokemon, signIn, getHighscoreDoc, submitHighscoreDoc, getHighscoreDocs} from './firebase';

function App() {
  const [status, setStatus] = useState("intro");
  const [startTime, setStartTime] = useState(null);
  const [scoreMillis, setScoreMillis] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [selection, setSelection] = useState({ visible: false });
  const [characters, setCharacters] = useState([]);

  //only triggers on doc load
  useEffect(() => {
    fetchPokemon().then(pokemon => setCharacters(pokemon));
    signIn()
      .then(() => getHighscoreDoc())
      .then(highScore => {
        setHighScore(highScore);
        console.log(highScore);
      });
  }, [])

  const showLeaderboard = () => {
    getHighscoreDocs().then(docs => {
      setHighScores(docs);
    }).then(() => {
      setStatus("leaderboard")
    })
  }

  const startGame = () => {
    setStatus("playing");
    setStartTime(Date.now());
  }

  const onBackgroundClick = (e) => {
    setSelection({
      visible: true,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      backgroundWidth: e.target.width - e.target.offsetLeft, //TODO move these elsewhere?
      backgroundHeight: e.target.height,
      boxX: e.pageX + 5,
      boxY: e.pageY + 5
    });
  }

  const hasSelectedCharacter = (character) => {
    const xOnOriginalImage = (selection.x / selection.backgroundWidth) * 1788; //image width, hardcoded for now
    const yOnOriginalImage = (selection.y / selection.backgroundHeight) * 1615; //image height, hardcoded for now

    return xOnOriginalImage >= character.startX && xOnOriginalImage <= character.endX
      && yOnOriginalImage >= character.startY && yOnOriginalImage <= character.endY
  };

  const onSelectBoxSelect = (characterName) => {
    const selectedCharacter = characters.find(character => character.name === characterName);
    if (hasSelectedCharacter(selectedCharacter)) {
      setCharacters(characters.map(character => {
        if (character === selectedCharacter) {
          return { ...character, found: true }
        } else {
          return { ...character, found: true }; //TODO replace
        }
      }));
    }
    setSelection({ ...selection, visible: false });
  }

  useEffect(() => {
    if (status === "playing" && characters.every(character => character.found)) {
      setScoreMillis(Date.now() - startTime);
      setStatus("ended");
    }
  }, [characters])

  const submitHighscore = (name, newHighScore) => {
    submitHighscoreDoc(name, newHighScore).then(() => console.log("success"));
  }

  //TODO solve code duplication
  if (status === "intro") {
    return (
      <div className="App">
        <StartModal showLeaderboard={showLeaderboard} startGame={startGame} characters={characters} />
        <Header status={status} characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
      </div>
    );
  } else if (status === "playing") {
    return (
      <div className="App">
        <Header status={status} characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
        <SelectBox onClick={onSelectBoxSelect} characters={characters} visible={selection.visible} x={selection.boxX} y={selection.boxY} />
      </div>
    );
  } else if (status === "ended") {
    return (
      <div className="App">
        <EndModal onSubmitHighScore={submitHighscore} scoreMillis={scoreMillis} highScore={highScore} />
        <Header status={status} characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
      </div>
    );
  } else if (status === "leaderboard") { //TODO router?
    return (
      <div className="App">
        <Leaderboard highScores={highScores} />
        <Header status={status} characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
      </div>
    );
  }
}

export default App;
