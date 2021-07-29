import React , { useState, useEffect } from 'react';
import RulesTateti from './RulesTateti';
import rest from '../../../common/rest'
import Modal from '../../../components/Modal/Modal';
import ShowCopyURL from '../../../components/ShowCopyURL';
import GiveUpButton from '../../rpsls/componentsRpsls/GiveUpButton';
import Board from './Board';
import indexTateti from '../cssTateti/indexTateti.css';
import MatchFinishedTateti from './MatchFinishedTateti';
import MatchCanceledTateti from './MatchCanceledTateti'; 



const urlJoin = 'http://localhost:3000/tateti/rooms/join/'
const url = 'http://localhost:5000/tateti/rooms/'

const RoomTateti = (props) => {
    //modal states
    const [showModal , setShowModal] = useState (false); 
    // alert states
    const [showAlert , setShowAlert] = useState (false);
    const [alertError , setAlertError] = useState (false);
    const [alertMessage , setAlertMessage] = useState ("");
    const [error , setError] = useState (false);
    // play states 
    const [turn , setTurn] = useState ("X"); 
    const [tatetiBoard , setTatetiBoard] = useState ([]);
    const [matchFinished , setMatchFinished] = useState (false); 
    const [matchCanceled , setMatchCanceled] = useState (false);
    const [winner , setWinner] = useState (-1); 
    
    const updateRoom = async (room) => {
        let response;
        
        try {
            response = await rest.get(`${url}${props.roomID}`);
            if (response.error) throw new Error (response.message);
            setTatetiBoard(response.tatetiBoard);
            setMatchFinished(response.matchFinished);
            setMatchCanceled(response.matchClosed);
            setWinner (response.playerWin);
        } catch (error) {
            showAlertOnScreen(true , error.message);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateRoom(props.roomID);
        }, 1000);
        return () => clearInterval(interval);
      }, [props]);

    function exitModal () {
        setShowModal (false); 
        setError (false); 
    };

    function showAlertOnScreen(error,msg){
        setShowAlert(true);
        setAlertError(error);
        setAlertMessage(msg);
    }

    function exitAlert(){
        setShowAlert(false);
        setAlertError(false);
        setAlertMessage("");
    }

    async function playMove (tatetiBoard) {
        let play = {
            hashPlayer: props.hash, 
            tatetiBoard: tatetiBoard, 
            id: props.roomID,
        };

        setTurn(turn === "X" ? "O" : "X");
        
        let response; 
        try {
            response = await rest.put(`${url}${props.roomID}`,play);
            
            if (response.error) throw new Error (response.message); 
            setTatetiBoard(response.tatetiBoard);
            
            }catch (error) {
            showAlertOnScreen (true , error.message);
            return;
        }
    }

        async function giveUp(){
            let giveUpInfo={
                hashPlayer:props.hash,
                id:props.roomID,
            };
            let response;
            try{
                response =await rest.delete(`${url}${props.roomID}`,giveUpInfo);
               
            }catch(error){
                showAlertOnScreen(true,error.message);
                return;
            }
        }

        if (matchCanceled == true) {
            return <MatchCanceledTateti/> 
        }  

        if (matchFinished == true) {
            return <MatchFinishedTateti winner = {winner}/>
        }

        return (
            <div>
                <div className = "container">
                {showModal ? <Modal visible={showModal} children={<RulesTateti/>} error={error} onExit={exitModal}/> : <div></div>}
                <h1>Sala del TaTeTi</h1><br/>
                <h3>Usted está en la sala {props.roomID == null ? "No asignada" : props.roomID}</h3><br/>
                <ShowCopyURL url={urlJoin} roomID={props.roomID}/><br/>
                <p> Recuerde, empiezan las X. 
                <br/>Si quiere ser círculo, no llore y pídale a su amigue que inicie la sala por usted.
                <br/>La victoria puede parecer obvia sin poner el último símbolo, pero se necesita que quede asentado en el tablero para determinar al ganador. <br/></p>
                <br/>
                <Board playMove = {playMove} turn = {turn} board={tatetiBoard} />
                <br/>
                <GiveUpButton giveUp={giveUp}/>
                <Modal visible={showAlert} error={alertError} onExit={exitAlert}>{alertMessage}</Modal>
            </div>
            </div> 
        )
}

export default RoomTateti