function HighscoreRow(props) {
    return (
        <tr>
            <td>{props.highScore.position}</td>
            <td>{props.highScore.name}</td>
            <td>{props.highScore.score}</td>
            <td>{props.highScore.date}</td>
        </tr>
    )
}

function Leaderboard(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="title">Leaderboard</div>
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.highScores.map((highScore) => <HighscoreRow highScore={highScore}/>)}
                    </tbody>
                </table>
                <form>
                    <button type="submit">Back to Game</button>
                </form>
            </div>
        </div>
    );
}

export default Leaderboard;