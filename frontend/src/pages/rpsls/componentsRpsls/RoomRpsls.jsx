import React,{useState, useEffect} from 'react'
import ImageMoves from './ImageMoves'
import Rules from './Rules'
import rest from '../../../common/rest'
import Modal from '../../../components/Modal/Modal'
import ShowCopyURL from '../../../components/ShowCopyURL'
import GiveUpButton from './GiveUpButton'
import Points from './Points'
import LastWinner from './LastWinner'
import MatchFinished from './MatchFinished'
import MatchCanceled from './MatchCanceled'
import Background from './RpslsBackground'
import '../css/indexRpsls.css'

const urlJoin = 'http://localhost:3000/rpsls/rooms/join/'
const url = 'http://localhost:5000/rpsls/rooms/'

const RoomRpsls = (props) => {
    //modal states
    const [showModal,setShowModal] = useState(false);
    //alert states
    const [showAlert, setShowAlert] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [error,setError] = useState(false);
    //play states
    const [points,setPoints] = useState([0,0]);
    const [lastWinner,setLastWinner] = useState(-2);
    const [matchWinner,setMatchWinner] = useState(-1);
    const [matchFinished,setMatchFinished] = useState(false);
    const [matchCanceled,setMatchCanceled] = useState(false)
    
    function exitModal(){
        setShowModal(false);
        setError(false);
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

    async function playMove(move){
        let play={
            move:move,
            hashPlayer:props.hash,
            id:props.roomID,
        };
        let response;
        try{
            response = await rest.put(`${url}${props.roomID}`,play);
            setPoints(response.points);
            if(response.error) throw new Error(response.message);
        } catch(error){
            showAlertOnScreen(true,error.message);
            return;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateRoom(props.roomID);
        }, 1000);
        return () => clearInterval(interval);
      }, [props]);
    
    async function updateRoom(room){
        let response;
        try {
            response = await rest.get(`${url}${props.roomID}`);
            if (response.error) throw new Error (response.message);
            setPoints(response.points);
            setLastWinner(response.lastWinner);
            setMatchWinner(response.matchWinner);
            setMatchFinished(response.matchFinished);
            setMatchCanceled(response.matchCanceled);
        } catch (error) {
            showAlertOnScreen(true , error.message);
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
    if(matchFinished) return <MatchFinished matchWinner={matchWinner}/>
    if(matchCanceled) return <MatchCanceled/>
    return (
        <div>
            {showModal ? <Modal visible={showModal} children={<Rules/>} error={error} onExit={exitModal}/> : <div></div>}
            <div className="title"><h1>SALA DE PIEDRA, PAPEL, TIJERA, LAGARTO, SPOCK!</h1></div>
            <div className="paragraph">
                <h3>Usted esta en la room {props.roomID == null ? "No asignada" : props.roomID}</h3>
                <ShowCopyURL css={"button2"} url={urlJoin} roomID={props.roomID}/>
            </div>
            <div className="title"><Points points={points}/></div>
            <div className="title"><LastWinner lastWinner={lastWinner}/></div>
            <div className="boxRpsls">
                <ImageMoves playMove={playMove}/>
            </div>
            <div className="boxRpsls">
                <button className="button" onClick={()=>{setShowModal(!showModal)}}>Mostrar Reglas</button>
                <GiveUpButton giveUp={giveUp}/>
            </div>
            <Modal visible={showAlert} error={alertError} onExit={exitAlert}>{alertMessage}</Modal>
            <div className="RpslsBackground"><Background/></div>
        </div>
    )
}
export default RoomRpsls;