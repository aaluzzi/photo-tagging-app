import '../styles/modal.css';

function StartModal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div><b>How to Play</b></div>
                <div>Find the given Pokemon as fast as possible! The assigned Pokemon will display at the top once you start. Good luck!</div>
                <button className="start" onClick={props.onClick}>Start</button>
            </div>
        </div>
    );
}

export default StartModal;