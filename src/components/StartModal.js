import '../styles/modal.css';

function StartModal(props) {
    return (
        <div className="modal">
            {props.characters.length > 0
            ? <div className="modal-content">
                <div className="title">How to Play</div>
                <div className="info">Search for the assigned Pokemon as fast as possible! When you find one, click it and select it in the context menu. Find all three to win.</div>
                <div className="buttons">
                    <button className="leaderboard" onClick={props.showLeaderboard}>Leaderboard</button>
                    <button className="primary" onClick={props.startGame}>Start</button>
                </div>
            </div>
            : null}
        </div>
    );
}

export default StartModal;