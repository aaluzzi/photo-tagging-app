import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc, doc, query } from 'firebase/firestore/lite';

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

async function fetchPokemon() {
    console.log("fetching pokemon");
    const q = query(collection(getFirestore(), 'pokemon'))

    const querySnapshot = await getDocs(q);

    //generate 3 unique indexes;
    //TODO make this seeded (new seed every minute or something)
    const randomIndexes = [];
    while (randomIndexes.length < 3) {
        const index = Math.floor(Math.random() * querySnapshot.docs.length);
        if (!randomIndexes.includes(index)) {
            randomIndexes.push(index);
        }
    }
    return randomIndexes.map(index => Pokemon(querySnapshot.docs.at(index).data()));
}

async function savePokemon(pokemon) {
    try {
        await addDoc(collection(getFirestore(), 'pokemon'), pokemon);
        console.log("success");
      } catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }
}

export {fetchPokemon, savePokemon};