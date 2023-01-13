import CharacterDisplay from './CharacterDisplay';

function Header(props) {
    return (
        <div className="header">
            <CharacterDisplay characters={props.characters} />
        </div>
    ); 
}

export default Header;