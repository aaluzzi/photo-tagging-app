import CharacterDisplay from './CharacterDisplay';

import Pokeball from '../pokeball.svg';

function Header(props) {
    return (
        <div className="header">
            <div className="content">
                <div className="left">
                    <img className="pokeball" src={Pokeball} alt="Pokeball"/>
                    <div className="logo">Find That Pokemon</div>
                </div>
                <CharacterDisplay status={props.status} characters={props.characters} />
            </div>
        </div>
    ); 
}
export default Header;