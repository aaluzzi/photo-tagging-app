import Background from '../background.png'

function GameBackground(props) {
    return (
        <img onClick={props.onClick} src={Background} alt="Game background"/>
    );
}

export default GameBackground;