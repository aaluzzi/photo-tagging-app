function EndModal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div><b>You win!</b></div>
                <div>Your time: {getFormattedTime(props.scoreMillis)}</div>
                <button className="leaderboard" onClick={props.onClick}>View leaderboard</button>
            </div>
        </div>
    ); 
}

function getFormattedTime(millis) {
    let minutesString = ("0" + Math.floor((millis / 60000) % 60)).slice(-2);
    let secondsString = ("0" + Math.floor((millis /1000) % 60)).slice(-2);
    let centisString = ("0" + ((millis / 10) % 100)).slice(-2);
    return `${minutesString}:${secondsString}.${centisString}`;
}

export default EndModal;