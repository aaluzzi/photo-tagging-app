import '../styles/modal.css';

function StartModal(props) {
    if (props.characters.length > 0) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="title">How to Play</div>
                    <div className="info">Search for the assigned Pokemon as fast as possible! When you find one, click it and select it in the context menu. Find all three to win. Good luck!</div>
                    <div className="buttons">
                        <button className="leaderboard" onClick={props.showLeaderboard}>Leaderboard</button>
                        <button className="primary" onClick={props.startGame}>Start</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default StartModal;