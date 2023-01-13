import Background from '../background.png'

function GameBackground(props) {
    return (
        <div className="background-frame">
            <img onClick={props.onClick} src={Background} alt="Game background"/>
        </div>
    );
}

export default GameBackground;