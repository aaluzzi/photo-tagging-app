import CharacterInfo from "./CharacterInfo";

function CharacterDisplay(props) {
    return (
        <div id="characters">
            {props.characters.map(character => <CharacterInfo character={character} />)}
        </div>
    );
}

export default CharacterDisplay;