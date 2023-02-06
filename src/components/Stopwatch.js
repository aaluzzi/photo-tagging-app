import {useEffect, useState} from 'react';

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setSeconds(prevSeconds => prevSeconds + 1), 1000);
        return () => clearInterval(id);
    }, []);

    const formatTime = (seconds) => {
        return ("0" + Math.floor(seconds / 3600)).slice(-2) 
        + ":" + ("0" + Math.floor(seconds / 60)).slice(-2) 
        + ":" + ("0" + Math.floor(seconds % 60)).slice(-2);
    }

    return <div id="stopwatch">{formatTime(seconds)}</div>
}

export default Stopwatch;