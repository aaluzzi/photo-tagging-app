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

  const onBackgroundClick = (e) => {
    //make sure select menu doesnt go off screen
    let boxX = e.pageX + 5;
    let boxY = e.pageY + 5;
    if (e.clientX + 115 > e.view.innerWidth) {
      boxX -= 115;
    }
    if (e.clientY + 130 > e.view.innerHeight) {
      boxY -= 130;
    }
    console.log(Math.floor(e.nativeEvent.offsetX / e.target.width * e.target.naturalWidth));
    console.log(Math.floor(e.nativeEvent.offsetY / e.target.height * e.target.naturalHeight));
    console.log("-");
    setSelection({
      visible: true,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      backgroundWidth: e.target.width - e.target.offsetLeft, //TODO move these elsewhere?
      backgroundHeight: e.target.height,
      boxX: boxX,
      boxY: boxY
    });
  }

  const hasSelectedCharacter = (character) => {
    const xOnOriginalImage = (selection.x / selection.backgroundWidth) * 2400; //image width, hardcoded for now
    const yOnOriginalImage = (selection.y / selection.backgroundHeight) * 3450; //image height, hardcoded for now

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
          return character;
          //return { ...character, found: true };
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
    submitHighscoreDoc(name, newHighScore);
  }

  return (
    <div className="App">
      <Header status={status} characters={characters} />
      <GameBackground onClick={onBackgroundClick} />
      {status === "leaderboard" ? <Leaderboard highScores={highScores} /> : null}
      {status === "intro" ? <StartModal showLeaderboard={showLeaderboard} startGame={startGame} characters={characters} /> : null}
      {status === "playing" ? <SelectBox onClick={onSelectBoxSelect} characters={characters} visible={selection.visible} x={selection.boxX} y={selection.boxY} /> : null}
      {status === "ended" ? <EndModal onSubmitHighScore={submitHighscore} scoreMillis={scoreMillis} highScore={highScore} /> : null}
    </div>
  );
}

export default App;
