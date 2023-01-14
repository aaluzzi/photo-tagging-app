function CharacterInfo(props) {
    if (props.character.found) {
        return (
            <div className="character-info">
                <div className="sprite found" style={{backgroundImage: `url(${getSpriteUrl(props.character)})`}}></div>
                <div className="character-name found">{props.character.name}</div>
            </div>
        );
    } else {
        return (
            <div className="character-info">
                <div className="sprite" style={{backgroundImage: `url(${getSpriteUrl(props.character)})`}}></div>
                <div className="character-name">{props.character.name}</div>
            </div>
        );
    }
}

function getSpriteUrl(pokemon) {
    return `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name.toLowerCase()}.png`
}

export default CharacterInfo;