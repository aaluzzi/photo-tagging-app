import './App.css';

import { useEffect, useState } from 'react';

import StartModal from './components/StartModal'
import GameBackground from './components/GameBackground';
import Header from './components/Header';
import SelectBox from "./components/SelectBox";
import EndModal from './components/EndModal';

import { fetchPokemon, signIn, getHighscoreDoc, submitHighscoreDoc} from './firebase';

function App() {
  const [status, setStatus] = useState("intro");
  const [startTime, setStartTime] = useState(null);
  const [scoreMillis, setScoreMillis] = useState(0);
  const [highScore, setHighScore] = useState(null);
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

  if (status === "intro") {
    return (
      <div className="App">
        <StartModal onClick={startGame} characters={characters} />
        <Header characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
      </div>
    );
  } else if (status === "playing") {
    return (
      <div className="App">
        <Header characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
        <SelectBox onClick={onSelectBoxSelect} characters={characters} visible={selection.visible} x={selection.boxX} y={selection.boxY} />
      </div>
    );
  } else if (status === "ended") {
    return (
      <div className="App">
        <EndModal onSubmitHighScore={submitHighscore} scoreMillis={scoreMillis} highScore={highScore} />
        <Header characters={characters} />
        <GameBackground onClick={onBackgroundClick} />
      </div>
    );
  }
}

const CHARACTERS = [
  {
    name: "Squirtle",
    found: false,
    startX: 1050,
    startY: 1180,
    endX: 1105,
    endY: 1285
  }, {
    name: "Flygon",
    found: false,
    startX: 265,
    startY: 160,
    endX: 435,
    endY: 280
  }, {
    name: "Infernape",
    found: false,
    startX: 120,
    startY: 1210,
    endX: 300,
    endY: 1330
  }
];

export default App;
