import CharacterDisplay from './CharacterDisplay';

function Header(props) {
    return (
        <div className="header">
            <CharacterDisplay status={props.status} characters={props.characters} />
        </div>
    ); 
}

export default Header;