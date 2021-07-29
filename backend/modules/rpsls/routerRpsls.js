const express = require('express');
const rpslsRouter = express.Router();
const fs = require('fs');
const common = require('../commonModules/commonModules.js');
const roomsUrl = './modules/rpsls/roomsRpsls.json';
let jsonRooms = {};
let dataRooms = {};
var ID = 0;

function readFile() {
    jsonRooms = fs.readFileSync('./modules/rpsls/roomsRpsls.json', 'utf-8'); //read my JSON
    dataRooms = JSON.parse(jsonRooms); //convert my JSON to array
}

function writeFile() {
    let data = JSON.stringify(dataRooms, null, 1); //convert my array to a JSON
    fs.writeFileSync('./modules/rpsls/roomsRpsls.json', data); //write
}

function createRoom() {
    readFile();
    const indexNull = dataRooms.indexOf(null); //return -1 if there is no room in null
    const player1ID = common.getHash(); //get the hash of the player1
    const date = Date.parse(Date());
    let id = -1;
    let room = {};
    if (indexNull == -1) {
        const idRoom = ID++;
        room = {
            id: idRoom, //id of the room
            playersIDs: [player1ID, null], //hash of the players
            points: [0, 0], //points of the players
            moves: [-1, -1], //movements of the players
            alreadyPlayed: [false,false], //so that the player does not play more than once
            lastWinner: -2, //winner of that play
            matchWinner: -1, //winer of the match
            matchFinished: false, //if the match ends
            matchCanceled: false, //if the match is canceled
            time: date
        }
        id = idRoom;
        dataRooms.push(room);
    } else {
        room = {
            id: indexNull, //replace the delete room
            playersIDs: [player1ID, null], //hash of the players
            points: [0, 0], //points of the players
            moves: [-1, -1], //movements of the players
            alreadyPlayed: [false,false], //so that the player does not play more than once
            lastWinner: -2, //winner of that play
            matchWinner: -1, //winer of the match
            matchFinished: false, //if the match ends
            matchCanceled: false, //if the match is canceled
            time: date
        }
        id = indexNull;
        dataRooms[indexNull] = room;
    }
    writeFile();
    readFile(); //read again my JSON to keep it updated
    return { id: id, hash: player1ID };
}

//Create new room
rpslsRouter.post('/rooms', (req, res) => {
    const { id, hash } = createRoom(); //deconstruct object
    common.deleteUselessRooms(roomsUrl, 14400000); //for delete the olds and useless rooms
    res.status(200).json({
        idRoom: id,
        hashP1: hash
    });
})

//Join the player2 to the game
rpslsRouter.post('/rooms/join/:id', (req, res) => {
    const idRoom = req.params.id;
    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'Sala inexistente.' });
        return;
    }
    //verify if there are two players
    if (dataRooms[idRoom].playersIDs[1]) {
        res.status(400).json({ error: true, message: 'No podes unirte. Ya existe un jugador 2.' });
        return;
    }
    const player2ID = common.getHash();
    dataRooms[idRoom].playersIDs[1] = player2ID;
    writeFile(); //write my file with the id of the player2
    readFile(); //i read it to keep it updated
    res.status(200).json({
        hashP2: player2ID,
        points: dataRooms[idRoom].points,
        idRoom: idRoom
    })
});

function movementValid(move) {
    if ((move > 0) & (move < 6)) {
        return true;
    }
    return false;
}

function hashExist(hashPlayer, idRoom) {
    return (dataRooms[idRoom].playersIDs.includes(hashPlayer)); //if that hash exist in that room
}

function storeMovement(move, hashPlayer, idRoom) {
    let index = dataRooms[idRoom].playersIDs.indexOf(hashPlayer);
    dataRooms[idRoom].moves[index] = move; //save the movement that he/she made
    dataRooms[idRoom].alreadyPlayed[index] = true;
    writeFile(); //write my file with the movement
    readFile(); //i read it to keep it updated
}

function played(hashPlayer, idRoom) { //return true if the player has already played
    let index = dataRooms[idRoom].playersIDs.indexOf(hashPlayer);
    return (dataRooms[idRoom].alreadyPlayed[index]);
}

function matchDone(idRoom) { //return true if bouth player choose their move
    return ((dataRooms[idRoom].moves[0] != -1) & (dataRooms[idRoom].moves[1] != -1));
}

function play(idRoom) {
    let moveP1 = dataRooms[idRoom].moves[0];
    let moveP2 = dataRooms[idRoom].moves[1];
    let winner = -2;
    switch(moveP1){
        case 1: //rock --> wins against Lizard,Scissor - lost against Paper,Spock
            if((moveP2===3)||(moveP2===4)) winner=0; //rock wins
            else if((moveP2===2)||(moveP2===5)) winner=1; //rock lose
            else if(moveP2===1) winner=-1;//tie!
        break;
        case 2: //paper --> wins against Rock,Spock - lost against Scissors,Lizard
            if((moveP2===1)||(moveP2===5)) winner=0; //paper wins
            else if((moveP2===3)||(moveP2===4)) winner=1; //paper lose
            else if(moveP2===2) winner=-1;//tie!
        break;
        case 3: //scissors --> wins against Paper,Lizard - lost against Rock,Spock
            if((moveP2===2)||(moveP2===4)) winner=0; //scissor wins
            else if((moveP2===1)||(moveP2===5)) winner=1; //scissor lose
            else if(moveP2===3) winner=-1;//tie!
        break;
        case 4: //lizard --> wins against Paper,Spock - lost against Rock,Scissor
            if((moveP2===2)||(moveP2===5)) winner=0; //lizard wins
            else if((moveP2===1)||(moveP2===3)) winner=1; //lizard lose
            else if(moveP2===4) winner=-1;//tie!
        break;
        case 5: //spock --> wins against Scissors,Rock - lost against Lizard,Paper
            if((moveP2===3)||(moveP2===1)) winner=0; //spock wins
            else if((moveP2===4)||(moveP2===2)) winner=1; //spock lose
            else if(moveP2===5) winner=-1; //tie!
        break;
    }
    switch (winner) {
        case -1:
            dataRooms[idRoom].lastWinner = -1; //tie!
            break;
        case 0:
            dataRooms[idRoom].lastWinner = 0;
            dataRooms[idRoom].points[0]++; //player one wins
            break;
        case 1:
            dataRooms[idRoom].lastWinner = 1;
            dataRooms[idRoom].points[1]++; //player two wins
            break;
    }
    winner=-2; //restart the winner
    if (dataRooms[idRoom].points[0] == 5){ //if the player1 get 5 points he/she wins the match
        dataRooms[idRoom].matchWinner=0;
        dataRooms[idRoom].matchFinished=true;
    }else if(dataRooms[idRoom].points[1] == 5){ //if the player2 get 5 points he/she wins the match
        dataRooms[idRoom].matchWinner=1;
        dataRooms[idRoom].matchFinished=true;
    }
    dataRooms[idRoom].moves[0] = -1; //restart the moves
    dataRooms[idRoom].moves[1] = -1;
    dataRooms[idRoom].alreadyPlayed[0] = false; //reset if the player has already played
    dataRooms[idRoom].alreadyPlayed[1] = false;
    writeFile(); //write my file with the movement
    readFile(); //i read it to keep it updated.
}


//start to play
//this gonna send every time that someone plays
rpslsRouter.put('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    const hashPlayer = req.body.hashPlayer;
    const move = req.body.move;
    readFile();
    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'Room inexistente.' });
        return;
    }
    //verify if sends hash
    if (!hashPlayer) {
        res.status(400).json({ error: true, message: 'La pagina necesita el hash del jugador.' });
        return;
    }
    //verify if the movement is valid
    if (!movementValid(move)) {
        res.status(400).json({ error: true, message: 'Movimiento invalido.' });
        return;
    }
    //verify is that hash exist in the room
    if (!hashExist(hashPlayer, idRoom)) {
        res.status(400).json({ error: true, message: 'El hash enviado no existe en esta sala.' });
        return;
    }
    //varify if that player already played
    if (!played(hashPlayer, idRoom)) {
        //i save the move of the player in the JSON
        storeMovement(move, hashPlayer, idRoom);
    } else {
        res.status(400).json({ error: true, message: 'Ya mandaste una jugada. Debes esperar a que la otra persona mande su movimiento.' });
        return;
    }

    if (matchDone(idRoom)) {
        play(idRoom); //business logic
    }

    res.status(200).json({
        id: idRoom,
        points: dataRooms[idRoom].points,
        moves: dataRooms[idRoom].moves,
        lastWinner: dataRooms[idRoom].lastWinner,
        matchWinner: dataRooms[idRoom].matchWinner,
        matchFinished: dataRooms[idRoom].matchFinished,
        matchCanceled: dataRooms[idRoom].matchCanceled,
    })
})

//Updated information
rpslsRouter.get('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'Room inexistente' });
        return;
    }
    res.status(200).json({
        idRoom: idRoom,
        points: dataRooms[idRoom].points,
        moves: dataRooms[idRoom].moves,
        lastWinner: dataRooms[idRoom].lastWinner,
        matchWinner: dataRooms[idRoom].matchWinner,
        matchFinished: dataRooms[idRoom].matchFinished,
        matchCanceled: dataRooms[idRoom].matchCanceled,
    });
})

//active a flag if some player cancel the match
rpslsRouter.delete('/rooms/:id', (req, res) => {
    const idRoom = req.params.id;
    const hashPlayer = req.body.hashPlayer;
    //verify if room exist
    if (!common.roomExists(dataRooms, idRoom)) {
        res.status(400).json({ error: true, message: 'Room inexistente.' });
        return;
    }
    //verify if sends hash
    if (!hashPlayer) {
        res.status(400).json({ error: true, message: 'La pagina necesita el hash del jugador.' });
        return;
    }
    if (!hashExist(hashPlayer, idRoom)) {
        res.status(400).json({ error: true, message: 'Ese hash no existe en esta sala.' });
        return;
    }
    readFile();
    dataRooms[idRoom].matchCanceled = true;
    writeFile();
    readFile();
    res.status(200).json({
        matchCanceled: true,
        message: 'El otro jugador se ha rendido'
    });
})

module.exports = rpslsRouter;