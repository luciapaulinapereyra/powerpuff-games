const express = require("express");
const hangmanRouter = express.Router();
const fs = require("fs");
const jsonWords = fs.readFileSync(
  "./modules/hangman/wordsHangman.json",
  "utf-8"
);
const wordsHangman = JSON.parse(jsonWords);
const common = require("../commonModules/commonModules.js");
let jsonRooms = {};
let dataRooms = {};
// assing ID to the room
var ID = 0;
function readFile() {
  jsonRooms = fs.readFileSync("./modules/hangman/roomsHangman.json", "utf-8"); //read JSON
  dataRooms = JSON.parse(jsonRooms); //convert my JSON to array
}
function writeFile() {
  let data = JSON.stringify(dataRooms, null, 1); //convert my array to a JSON
  fs.writeFileSync("./modules/hangman/roomsHangman.json", data); //write
}

function getRandomWord() {
  return wordsHangman.words[
    Math.floor(Math.random() * wordsHangman.words.length)
  ]; //word random of wordsHangman.json
}
function createRoom() {
  readFile();
  const randomWord = getRandomWord();
  const indexNull = dataRooms.indexOf(null); //return -1 if there is no room in null
  const wordProgress = Array(randomWord.length).fill(null); //progress of the client with the word to guess
  const arrLetters = Array();
  let room = {};
  let id = -1;
  if (indexNull == -1) {
    const idRoom = ID++;
    room = {
      id: idRoom, //id of the room
      word: randomWord,
      tries: 0,
      wordProgress,
      arrLetters,
    };
    id = idRoom;
    dataRooms.push(room); //save that room in the array
  } else {
    room = {
      id: indexNull, //replace the delete room
      word: randomWord,
      tries: 0,
      wordProgress,
      arrLetters,
    };
    id = indexNull;
    dataRooms[indexNull] = room;
  }
  writeFile(); //save in roomsHangman
  readFile(); //read again the JSON to keep it updated
  return { id: id, tries: 0, wordProgress: wordProgress };
}

// UTILS
function processLost(req, res, matchFinished) {
  if (matchFinished) {
    res.status(200).json({
      error: false,
      message: "Perdiste",
      letter: req.body.letter,
      word: req.body.word,
      tries: dataRooms[req.params.roomId].tries,
      failed: true,
      matchFinished: true,
      matchWon: false,
      correctWord: dataRooms[req.params.roomId].word,
      wordProgress: dataRooms[req.params.roomId].wordProgress,
    });
    common.roomDeleteByID(dataRooms, req.params.roomId);
    writeFile();
    readFile();
  } else {
    res.status(200).json({
      error: false,
      message: "Ups! Incorrecto",
      letter: req.body.letter,
      word: req.body.word,
      tries: dataRooms[req.params.roomId].tries,
      failed: true,
      matchWon: false,
      matchFinished: false,
      wordProgress: dataRooms[req.params.roomId].wordProgress,
    });
  }
}

function processWin(req, res, matchFinished) {
  if (matchFinished) {
    //fill the word progress array
    let str = dataRooms[req.params.roomId].word;
    for (let i = 0; i < str.length; i++) {
      dataRooms[req.params.roomId].wordProgress[i] = str[i];
    }
    res.status(200).json({
      error: false,
      message: "Ganaste! :D",
      letter: req.body.letter,
      word: req.body.word,
      tries: dataRooms[req.params.roomId].tries,
      failed: false,
      matchFinished: true,
      matchWon: true,
      wordProgress: dataRooms[req.params.roomId].wordProgress,
    });
    common.roomDeleteByID(dataRooms, req.params.roomId);
    writeFile();
    readFile();
  } else {
    res.status(200).json({
      error: false,
      message: "Correcto! :)",
      letter: req.body.letter,
      word: req.body.word,
      tries: dataRooms[req.params.roomId].tries,
      failed: false,
      matchWon: false,
      matchFinished: false,
      wordProgress: dataRooms[req.params.roomId].wordProgress,
    });
  }
}

function getPositionsOfLetterByRoomID(roomId, letter) {
  // If a letter is repeated, I send the indices of the places where it occurs
  let str = dataRooms[roomId].word;
  let indices = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      indices.push(i);
      dataRooms[roomId].wordProgress[i] = letter;
    }
  }
  writeFile();
  return indices;
}

// END OF UTILS

// new room
hangmanRouter.post("/rooms", (req, res) => {
  const { id, tries, wordProgress } = createRoom();
  res.json({ id: id, tries, wordProgress, message: "" });
});

// play letter
hangmanRouter.put("/rooms/:roomId", (req, res) => {
  // check if this room exists
  if (!common.roomExists(dataRooms, req.params.roomId)) {
    res.json({ error: true, message: "Esta sala no existe" }).status(404);
    return;
  }
  // check if the clinet send a letter
  const clientWord = req.body.word;
  if (clientWord) {
    //won the word
    if (dataRooms[req.params.roomId].word === clientWord) {
      processWin(req, res, true);
      return;
    }
    dataRooms[req.params.roomId].tries++;
    //lost and has no attempts left
    if (dataRooms[req.params.roomId].tries > 6) {
      processLost(req, res, true);
      return;
    }
    processLost(req, res, false);
    return;
  }

  const clientLetter = req.body.letter;
  if (!clientLetter) {
    res
      .json({
        error: true,
        message: "Debes mandar una letra o una palabra para poder jugar",
      })
      .status(404);
    return;
  } else {

  }
  //check if the letter was sent. added 14/7
   if(dataRooms[req.params.roomId].arrLetters.includes(clientLetter)) {
     res.status(404).json ({
        error:true,
        message:"Ya jugaste esta letra"
     });
     return;
   }
  // here you are enabled to play with a letter
  // logic of the game
  const indices = getPositionsOfLetterByRoomID(req.params.roomId, clientLetter);
  //Save all the letters of de client. added 14/7
  dataRooms[req.params.roomId].arrLetters.push(clientLetter);
  writeFile();
  readFile();
  if (indices.length < 1) {
    dataRooms[req.params.roomId].tries++;
    writeFile();
    // if he lost and the match is finished
    if (dataRooms[req.params.roomId].tries === 7) {
      processLost(req, res, true);
      return;
    }
    // if he lost but the match is not finished
    processLost(req, res, false);
    return;
  } else {
    // if he win and the match is finished
    let ganoLaPartida = !dataRooms[req.params.roomId].wordProgress.some(
      (letter) => letter === null
    );
    if (ganoLaPartida) {
      processWin(req, res, true);
      return;
    }
    processWin(req, res, false);
    //if he win but the match is not finished
  }
});

// delete room
hangmanRouter.delete("/rooms/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  if (!common.roomExists(dataRooms, roomId)) {
    res.status(404).json({
      error: true,
      message: "Esta sala no existe.",
      matchFinished: true,
    });
    return;
  }
  res.status(200).json({
    error: false,
    message: "Esta sala esta cerrada.",
    matchFinished: true,
    correctWord: dataRooms[roomId].word,
  });
  common.roomDeleteByID(dataRooms, req.params.roomId);
  writeFile();
  readFile();
});

module.exports = hangmanRouter;
