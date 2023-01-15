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
                    <div className="title">Pokemon Found</div>      
                    <div>You finished in {getFormattedTime(props.scoreMillis)}!<b> New high score!</b></div>
                    <div>Enter your name and submit it to the leaderboard:</div>
                    <form onSubmit={(e) => {
                        props.onSubmitHighScore(name, props.scoreMillis);
                    }}>
                        <input onChange={onNameChange} type="text" placeholder="Name" maxlength="22" value={name} required></input>
                        <button className="primary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        ); 
    } else {
        return (
            <div className="modal">
                <div className="modal-content">     
                    <div className="title">Pokemon Found</div>         
                    <div>You finished in {getFormattedTime(props.scoreMillis)}!</div>
                    <div>You didn't beat your high score this time. Try again?</div>
                    <form>
                        <button className="primary" onClick={props.onClick} type="submit">Play again</button>
                    </form>
                </div>
            </div>
        ); 
    }
}

function getFormattedTime(millis) {
    let minutesString = ("0" + Math.floor((millis / 60000) % 60)).slice(-2);
    let secondsString = ("0" + Math.floor((millis /1000) % 60)).slice(-2);
    let centisString = ("0" + Math.floor((millis / 10) % 100)).slice(-2);
    return `${minutesString}:${secondsString}.${centisString}`;
}

export {getFormattedTime};
export default EndModal;