function CharacterInfo(props) {
    if (props.character.found) {
        return (
            <div className="character-info">
                <img className="sprite found" src={getSpriteUrl(props.character)} alt={props.character.name} />
                <div className="character-name found">{props.character.name}</div>
            </div>
        );
    } else {
        return (
            <div className="character-info">
                <img className="sprite" src={getSpriteUrl(props.character)} alt={props.character.name} />
                <div className="character-name">{props.character.name}</div>
            </div>
        );
    }
}

function getSpriteUrl(pokemon) {
    return `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name.toLowerCase()}.png`
}

export default CharacterInfo;