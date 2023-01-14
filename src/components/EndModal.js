import {useState} from 'react';

function EndModal(props) {
    const [name, setName] = useState(props.highScore.name);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    if (props.scoreMillis < props.highScore.score) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div>Your finished in <b>{getFormattedTime(props.scoreMillis)}!</b></div>
                    <div><b>New high score!</b> Enter your name and submit it to the leaderboard:</div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.onSubmitHighScore(name, props.scoreMillis);
                    }}>
                        <input onChange={onNameChange} type="text" placeholder="Name" value={name} required></input>
                        <button className="submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        ); 
    } else {
        return (
            <div className="modal">
                <div className="modal-content">              
                    <div>You finished in <b>{getFormattedTime(props.scoreMillis)}</b>!</div>
                    <div>You did not beat your high score this time. Try again!</div>
                    <form>
                        <button className="leaderboard" onClick={props.onClick}>View leaderboard</button>
                        <button className="restart" onClick={props.onClick} type="submit">Play again</button>
                    </form>
                </div>
            </div>
        ); 
    }
}

function getFormattedTime(millis) {
    let minutesString = ("0" + Math.floor((millis / 60000) % 60)).slice(-2);
    let secondsString = ("0" + Math.floor((millis /1000) % 60)).slice(-2);
    let centisString = ("0" + ((millis / 10) % 100)).slice(-2);
    return `${minutesString}:${secondsString}.${centisString}`;
}

export default EndModal;