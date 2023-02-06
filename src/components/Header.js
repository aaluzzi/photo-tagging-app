import CharacterDisplay from './CharacterDisplay';
import Stopwatch from './Stopwatch';

import Pokeball from '../pokeball.svg';

function Header(props) {
    if (props.status === "playing") {
        return (
            <div className="header">
                <div id="logo">
                    <img className="pokeball" src={Pokeball} alt="Pokeball" />
                    <div className="logo-text">Find That Pokemon</div>
                </div>
                <CharacterDisplay characters={props.characters} />
                <Stopwatch />
            </div>
        );
    } else {
        return (
            <div className="header">
                <div id="logo">
                    <img className="pokeball" src={Pokeball} alt="Pokeball" />
                    <div className="logo-text">Find That Pokemon</div>
                </div>
            </div>
        );
    }
}
export default Header;