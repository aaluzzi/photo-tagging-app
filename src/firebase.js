import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc, query, orderBy, serverTimestamp} from 'firebase/firestore/lite';
import {getAuth, signInAnonymously} from 'firebase/auth';
import { getFormattedTime } from "./components/EndModal";
import seedrandom from "seedrandom";

const firebaseConfig = {
  apiKey: "AIzaSyDfZ6x1npJrfWBZHKA6MhzxPD0lcdaEeYw",
  authDomain: "find-that-pokemon-da0dc.firebaseapp.com",
  projectId: "find-that-pokemon-da0dc",
  storageBucket: "find-that-pokemon-da0dc.appspot.com",
  messagingSenderId: "707861063424",
  appId: "1:707861063424:web:08a3030dfac9cf1edff5e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Pokemon(docData) {
    return {
        name: docData.name,
        found: false,
        startX: docData.startCoords[0],
        startY: docData.startCoords[1],
        endX: docData.endCoords[0],
        endY: docData.endCoords[1],
    }
}

function createPokemon(pokemonName, startX, startY, endX, endY) {
    return {name:pokemonName, startCoords: [startX, startY], endCoords: [endX, endY]};
}

async function fetchPokemon() {
    let rng = seedrandom(Math.floor(Date.now() / 10000));
    const snapshotEasyPokemon = await getDocs(query(collection(getFirestore(), 'pokemon_easy')));
    const snapshotMediumPokemon = await getDocs(query(collection(getFirestore(), 'pokemon_medium')));
    const snapshotHardPokemon = await getDocs(query(collection(getFirestore(), 'pokemon_hard')));

    return [
        Pokemon(snapshotEasyPokemon.docs.at(Math.floor(rng() * snapshotEasyPokemon.docs.length)).data()),
        Pokemon(snapshotMediumPokemon.docs.at(Math.floor(rng() * snapshotMediumPokemon.docs.length)).data()),
        Pokemon(snapshotHardPokemon.docs.at(Math.floor(rng() * snapshotHardPokemon.docs.length)).data()),
    ];
}

async function savePokemon(pokemon, difficulty) {
    console.log(pokemon);
    try {
        await setDoc(doc(getFirestore(), `pokemon_` + difficulty, pokemon.name), pokemon);
        console.log("success");
      } catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }
}

async function signIn() {
    await signInAnonymously(getAuth());
 }

async function getHighscoreDoc() {
    try {
        let docSnap = await getDoc(doc(getFirestore(), 'highscores', getAuth().currentUser.uid));
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch(error) {
        console.error('Error reading score from Firebase Database', error);
    }
    return {name: "", score: 99999999999};
}

async function getHighscoreDocs() {
    let highscores = [];
    try {
        let docsSnap = await getDocs(query(collection(getFirestore(), 'highscores'), orderBy('score')));
        docsSnap.forEach((highscore, index) => {
            highscores.push({
                position: (index + 1),
                name: highscore.data().name,
                score: getFormattedTime(highscore.data().score),
                date: highscore.data().timestamp.toDate().toLocaleDateString()
            });
        });
    } catch(error) {
        console.error('Error reading scores from Firebase Database', error);
    }
    return highscores;
}

async function submitHighscoreDoc(name, score) {
    try {
        await setDoc(doc(getFirestore(), 'highscores', getAuth().currentUser.uid), {name, score, timestamp: serverTimestamp()});
    } catch(error) {
        console.error('Error submitting score to Firebase Database', error);
    }
}

export {createPokemon, savePokemon, fetchPokemon, signIn, getHighscoreDoc, getHighscoreDocs, submitHighscoreDoc};