const express = require('express');
const tatetiRouter = express.Router();
const fs = require('fs');
const common = require('../commonModules/commonModules.js');
const roomsUrl = './modules/tateti/roomsTateti.json';

// variables and constants for rooms
let jsonRooms = {};
let dataRooms = {};
var ID = 0;

// reed and write from JSON 
function readFile() {
    jsonRooms = fs.readFileSync('./modules/tateti/roomsTateti.json', 'utf-8'); // read 
    dataRooms = JSON.parse(jsonRooms); // conver my JSON to array 
}

function writeFile() {
    let data = JSON.stringify(dataRooms, null, 1); //convert my array to a JSON
    fs.writeFileSync('./modules/tateti/roomsTateti.json', data) // write
}

// CREATE ROOMS 
// room preparation and IDS assignment
function createRoom() {
    readFile();
    const indexNull = dataRooms.indexOf(null) // return -1 if the room is empty
    const playerOneId = common.getHash(); // get the hash for the first player
    let id = -1;
    let room = {};

    if (indexNull == -1) {
        // if the room is empty ... 
        const idRoom = ID++;
        room = {
            id: idRoom,
            playersIDs: [playerOneId, null], // the room is create with the first player in it
            alredyPlayed: [false, true], // false = the player is allowed to play. 
            matchFinished: false, //if the match ends
            playerWin: -1, // "-1" if the game not finished, "0" if player 1 win , "1" if player 2 win and "2" if is a tie
            matchClosed: false, //if the match is canceled
            tatetiBoard: [null, null, null, null, null, null, null, null, null],
            totalMoves: 0
        }
        id = idRoom;
        dataRooms.push(room);
    } else {
        room = {
            id: indexNull, // replace the delate room
            playersIDs: [playerOneId, null], // the room is create with the first player in it
            alredyPlayed: [false, true], // false = the player is allowed to play. 
            matchFinished: false, //if the match ends
            playerWin: -1, // "-1" if the game not finished, "0" if player 1 win , "1" if player 2 win and "2" if is a tie
            matchClosed: false, //if the match is canceled
            tatetiBoard: [null, null, null, null, null, null, null, null, null],
            totalMoves: 0
        }
        id = indexNull;
        dataRooms[indexNull] = room;
    }
    writeFile();
    readFile(); // read again to keep it updated
    return { id: id, hash: playerOneId };
}

// create a new room 
tatetiRouter.post('/rooms', (req, res) => {
    const { id, hash } = createRoom();
    common.deleteUselessRooms(roomsUrl, 14400000); //for delete the olds rooms, 14400000 is 4hs
    res.status(200).json({
        idRoom: id,
        hashP1: hash
    });
});

// join player 2 
tatetiRouter.post('/rooms/join/:id', (req, res) => {
    const idRoom = req.params.id;
    // if the room exist 
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'La sala no existe' });
        return;
    }
    // if player 2 is alredy in game 
    if (dataRooms[idRoom].playersIDs[1]) {
        res.status(400).json({ error: true, message: 'El jugador dos ya existe' });
        return;
    }
    const playerTwoID = common.getHash();
    dataRooms[idRoom].playersIDs[1] = playerTwoID;
    writeFile();
    readFile();

    res.status(200).json({
        hashP2: playerTwoID
    })
});

// MODIFY THE ROOMS
// functions used to modify the room

// if the player with that hash is in the room
function hashExist(hashPlayer, idRoom) {
    return (dataRooms[idRoom].playersIDs.includes(hashPlayer));
}

// return true if the player alredy play
function played(hashPlayer, idRoom) {
    let index = dataRooms[idRoom].playersIDs.indexOf(hashPlayer);
    return (dataRooms[idRoom].alredyPlayed[index]);
}

// return true if the position is null and is in the board
function validPosition(position, idRoom) {
    let aux = dataRooms[idRoom].tatetiBoard[position];
    if (aux == null) {
        if ((aux >= 0) || (aux <= 8)) {
            return true;
        }
    }
    return false;
}

// store the movement and change some fields
function storeMovement(position, hashPlayer, idRoom) {
    let index = dataRooms[idRoom].playersIDs.indexOf(hashPlayer);
    // index gonna be the index of the hashPlayers
    if (index === 0) {
        // index 0 = player 1 , save the movement 
        dataRooms[idRoom].tatetiBoard[position] = "X";
        // player one already played
        dataRooms[idRoom].alredyPlayed[index] = true;
        // player two is ready to play 
        dataRooms[idRoom].alredyPlayed[++index] = false;
    } else {
        // index 1 = player 2 , save the movement 
        dataRooms[idRoom].tatetiBoard[position] = "O";
        // player two already played
        dataRooms[idRoom].alredyPlayed[index] = true;
        // player one is ready to play 
        dataRooms[idRoom].alredyPlayed[--index] = false;
    }
    // every move is count 
    dataRooms[idRoom].totalMoves++;
    writeFile(); //write my file with the movement
    readFile(); //i read it to keep it updated
}

// Search for the given symbol in any of the 8 winning positions
function checkForWinner(symbol, idRoom) {
    tatetiBoard = dataRooms[idRoom].tatetiBoard;
    // first row 
    if (tatetiBoard[0] == symbol && tatetiBoard[1] == symbol && tatetiBoard[2] == symbol) {
        return true
    }
    // second row 
    if (tatetiBoard[3] == symbol && tatetiBoard[4] == symbol && tatetiBoard[5] == symbol) {
        return true
    }
    // third row 
    if (tatetiBoard[6] == symbol && tatetiBoard[7] == symbol && tatetiBoard[8] == symbol) {
        return true
    }
    // firt column
    if (tatetiBoard[0] == symbol && tatetiBoard[3] == symbol && tatetiBoard[6] == symbol) {
        return true
    }
    // second column
    if (tatetiBoard[1] == symbol && tatetiBoard[4] == symbol && tatetiBoard[7] == symbol) {
        return true
    }
    // third column 
    if (tatetiBoard[2] == symbol && tatetiBoard[5] == symbol && tatetiBoard[8] == symbol) {
        return true
    }
    // one of the two diagonals 
    if (tatetiBoard[0] == symbol && tatetiBoard[4] == symbol && tatetiBoard[8] == symbol) {
        return true
    }
    // the other diagonal 
    if (tatetiBoard[2] == symbol && tatetiBoard[4] == symbol && tatetiBoard[6] == symbol) {
        return true
    }
    // if there aren't symbols in the winning positions, return false
    return false;

}

// return true if the board is full
function checkForTie(idRoom) {
    return (dataRooms[idRoom].totalMoves == 9)
}

// modify the room
// this gonna send every time that someone plays 
tatetiRouter.put('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    // the player 
    const hashPlayer = req.body.hashPlayer;
    // the "move"
    const tatetiBoard = req.body.tatetiBoard;
    readFile();

    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'No existe la sala' });
        return;
    }
    //verify if sends hash 
    if (!hashPlayer) {
        res.status(400).json({ error: true, message: 'La pagina necesita el hash del jugador' });
        return;
    }
    //verify is that hash exist in the room  
    if (!hashExist(hashPlayer, idRoom)) {
        res.status(400).json({ error: true, message: 'Ese hash no existe en esta sala' });
        return;
    }

    //business logic
    // the game 
    // check if the player didn't play and the positions is valid 
    if ((!played(hashPlayer, idRoom)) && validPosition(tatetiBoard, idRoom)) {
        storeMovement(tatetiBoard, hashPlayer, idRoom); // save the movement
        // if the player can't play, look for the reasons 
    } else if (played(hashPlayer, idRoom)) {
        res.status(400).json({ error: true, message: 'Ya jugaste' });
        return;
    } else if (!validPosition(tatetiBoard, idRoom)) {
        res.status(400).json({ error: true, message: 'El movimiento no es valido' });
        return;
    }

    // look for the winner or if is a tie 
    if (checkForWinner('X', idRoom)) {
        // if this is true, the player 1 is the winner
        dataRooms[idRoom].playerWin = 0;
        dataRooms[idRoom].matchFinished = true;
    } else if (checkForWinner('O', idRoom)) {
        dataRooms[idRoom].playerWin = 1;
        dataRooms[idRoom].matchFinished = true;
    } else if (checkForTie(idRoom)) {
        dataRooms[idRoom].playerWin = 2;
        dataRooms[idRoom].matchFinished = true;
    };

    writeFile(); //write my file with the movement
    readFile(); //i read it to keep it updated.

    res.status(200).json({
        id: idRoom,
        alredyPlayed: dataRooms[idRoom].alredyPlayed,
        matchFinished: dataRooms[idRoom].matchFinished,
        playerWin: dataRooms[idRoom].playerWin,
        matchClosed: dataRooms[idRoom].matchClosed,
        tatetiBoard: dataRooms[idRoom].tatetiBoard,
        totalMoves: dataRooms[idRoom].totalMoves,
    })
})

//Updated information
tatetiRouter.get('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    const hashPlayer = req.body.hashPlayer;

    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'La sala no existe' });
        return;
    }
    //verify if sends ID
    res.status(200).json({
        idRoom: idRoom,
        alredyPlayed: dataRooms[idRoom].alredyPlayed,
        matchFinished: dataRooms[idRoom].matchFinished,
        matchClosed: dataRooms[idRoom].matchClosed,
        tatetiBoard: dataRooms[idRoom].tatetiBoard,
        playerWin: dataRooms[idRoom].playerWin,
        totalMoves: dataRooms[idRoom].totalMoves,
    });
})

// DELETE ROOMS 
//active a flag if some player cancel the match
tatetiRouter.delete('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    const hashPlayer = req.body.hashPlayer;
    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'No existe la sala' });
        return;
    }
    //verify if sends hash
    if (!hashPlayer) {
        res.status(400).json({ error: true, message: 'Se necesita el hash del jugador' });
        return;
    }
    if (!hashExist(hashPlayer, idRoom)) {
        res.status(400).json({ error: true, message: 'El hash no existe' });
        return;
    }
    readFile();
    dataRooms[idRoom].matchClosed = true;
    writeFile();
    readFile();
    res.status(200).json({
        matchClosed: true
    });
})

module.exports = tatetiRouter;