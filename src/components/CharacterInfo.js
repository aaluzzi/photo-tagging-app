function CharacterInfo(props) {
    return (
        <div className="character-info">
            <div>{props.character.found ? "✔️" : "❓"}</div>
            <div className="character-name"><b>{props.character.name}</b></div>
        </div>
    );
}

export default CharacterInfo;