import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router';
import GoBack from '../../components/GoBack';
import Modal from '../../components/Modal/Modal'
import Rules from './componentsRpsls/Rules'
import RoomRpsls from './componentsRpsls/RoomRpsls'
import rest from '../../common/rest'
import Background from '../rpsls/componentsRpsls/RpslsBackground'
import './css/indexRpsls.css'

const url = 'http://localhost:5000/rpsls'

const Rpsls = () => {
    //States
    const [roomID,setRoomID] = useState(null);
    const [hash,setHash] = useState(-1);
    const [showRoom, setShowRoom] = useState(false);
    const [showModal,setShowModal]= useState(true);
    // modal alerts
    const [showAlert, setShowAlert] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [error,setError]= useState(false);
    
    const { id } = useParams(); //to get the params of the url

    function exitModal(){
        setShowModal(false);
        setError(false);
    };
    
    function showModalOnScreen(error, msg){
        setShowModal(true);
        if (error) setError(true);
    };

    const showAlertOnScreen = (error = false, msg = "") => {
        setShowAlert(true);
        setAlertError(error);
        setAlertMessage(msg);
    }
    const exitAlert = () =>{
        setShowAlert(false);
        setAlertError(false);
        setAlertMessage("");
    }

    //Create a new Room
    async function newRoom(){
        let room;
        try{
            room = await rest.post(`${url}/rooms`, {});
            if (room.error) throw new Error(room.message);
        } catch (error){
            showModalOnScreen(true,error.message);
            return;
        }
        setShowRoom(true);
        setRoomID(room.idRoom);
        setHash(room.hashP1);
    }

    //Join new player
    useEffect(() => {
        const joinRoom = async () => {
            if (id) {
                try {
                    const joinedRoom = await rest.post(`${url}/rooms/join/${id}`, {});
                    if (joinedRoom.error) throw new Error(joinedRoom.message);
                        setRoomID(id);
                        setHash(joinedRoom.hashP2);
                        setShowRoom(true);
                } catch (err) {
                    showAlertOnScreen(true, err.message)
                }
            }
        }
        joinRoom();
    }, [id])

    if(showRoom) return <RoomRpsls roomID={roomID} hash={hash}/>

    return (
            <div>
                <Modal visible={showModal} children={<Rules/>} error={error} onExit={exitModal}/>
                <Modal visible={showAlert} error={alertError} onExit={exitAlert}> <div>{alertMessage}</div></Modal>
                <div className="title"><h1>PIEDRA, PAPEL, TIJERA, LAGARTO, SPOCK!</h1></div>
                <div className="boxRpslsIndex">
                    <button className="buttonIndex" onClick={newRoom}>Crear Sala</button>
                    <GoBack css={"buttonIndex"}/>
                </div>
                <div className="RpslsBackground"><Background /></div>
            </div>
    )
}
export default Rpsls;