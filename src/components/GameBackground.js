import Background from '../background.webp'

import {useState} from 'react';

import SelectBox from './SelectBox';

function GameBackground(props) {
    const [selection, setSelection] = useState({ visible: false, boxX: 0, boxY: 0 });

    const onBackgroundClick = (e) => {
        //make sure select menu doesnt go off screen
        let boxX = e.pageX + 3;
        let boxY = e.pageY + 3;
        let boxWidth = document.getElementById("select-box").offsetWidth;
        let boxHeight = document.getElementById("select-box").offsetHeight;
        if (boxX + boxWidth > e.target.width) {
          boxX -= boxWidth;
        }
        if (boxY + boxHeight > e.target.height) {
          boxY -= boxHeight;
        }
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

    const onSelectBoxSelect = (characterName) => {
        const selectedCharacter = props.characters.find(character => character.name === characterName);
        if (hasSelectedCharacter(selectedCharacter)) {
          props.findCharacter(selectedCharacter);
        }
        setSelection({ ...selection, visible: false });
    }

    const hasSelectedCharacter = (character) => {
        const xOnOriginalImage = (selection.x / selection.backgroundWidth) * 2400; //image width, hardcoded for now
        const yOnOriginalImage = (selection.y / selection.backgroundHeight) * 3450; //image height, hardcoded for now
    
        return xOnOriginalImage >= character.startX && xOnOriginalImage <= character.endX
          && yOnOriginalImage >= character.startY && yOnOriginalImage <= character.endY
    }

    return (
        <div>
            <img id="background" onClick={onBackgroundClick} src={Background} alt="Game background" /> 
            <SelectBox onClick={onSelectBoxSelect} characters={props.characters} visible={selection.visible} x={selection.boxX} y={selection.boxY} />
        </div>
    );
}

export default GameBackground;