import CharacterInfo from "./CharacterInfo";

function CharacterDisplay(props) {
    if (props.status === "playing") {
        return (
            <div className="characters">
                {props.characters.map(character => <CharacterInfo character={character} />)}
            </div>
        );
    }
    return null;
}

export default CharacterDisplay;