import { useState } from "react";

import {createPokemon, savePokemon} from "../firebase";

function Submit(props) {
    const [difficulty, setDifficulty] = useState("");
    const [name, setName] = useState("");
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    return (
        <form onSubmit={e => {
            e.preventDefault();
            savePokemon(createPokemon(name, startX, startY, endX, endY), difficulty);
        }}>
            <div>
                <input onChange={e => setDifficulty(e.target.value)} value={difficulty} type="text" placeholder="difficulty" />
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="name" />
            </div>
            <div>
                <input onChange={e => setStartX(e.target.value)} value={startX} type="number" />
                <input onChange={e => setStartY(e.target.value)} value={startY} type="number" />
            </div>
            <div>
                <input onChange={e => setEndX(e.target.value)} value={endX} type="number" />
                <input onChange={e => setEndY(e.target.value)} value={endY} type="number" />
            </div>
            <button type="submit">Submit</button>
        </form>
    ) ;
}

export default Submit;