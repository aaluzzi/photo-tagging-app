import Background from '../background.webp'

function GameBackground(props) {
    return (
        <img id="background" onClick={props.onClick} src={Background} alt="Game background"/>
    );
}

export default GameBackground;