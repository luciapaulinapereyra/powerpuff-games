import React,{useState, useEffect} from 'react'
import rest from '../../common/rest';
import { useParams } from 'react-router';
import Modal from '../../components/Modal/Modal';
import RulesTateti from './componentsTateti/RulesTateti';
import RoomTateti from './componentsTateti/RoomTateti'
import GoBack from '../../components/GoBack'; 
import indexTateti from './cssTateti/indexTateti.css'

const URL = 'http://localhost:5000/tateti';

const Tateti = () => {
    //States
    const [roomID,setRoomID] = useState(null);
    const [hash,setHash] = useState(-1);
    const [showRoom, setShowRoom] = useState(false);
    const [showModal,setShowModal]= useState(true);
    const [error,setError]= useState(false);
    // modal alerts
    const [showAlert, setShowAlert] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
   // end of states 
   
    const { id } = useParams ();
 
    // functions for the modal 
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
    };

    const exitAlert = () =>{
      setShowAlert(false);
      setAlertError(false);
      setAlertMessage("");
    };


    // nueva sala 
    async function newRoom(){
      let room;
      try{
          room = await rest.post(`${URL}/rooms`, {});
          console.log(room);
          if (room.error) throw new Error(room.message);
      } catch (error){
          showModalOnScreen(true,error.message);
          return;
      }
      setShowRoom(true);
      setRoomID(room.idRoom);
      setHash(room.hashP1);
    }

    useEffect(() => {
      const joinRoom = async () => {
          if (id) {
              try {
                  const joinedRoom = await rest.post(`${URL}/rooms/join/${id}`, {});
                  console.log(joinedRoom);
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

    if(showRoom) return <RoomTateti roomID={roomID} hash={hash}/>

      return (
        <div>
          <div className = "container"> 
            <Modal visible={showModal} children={<RulesTateti/>} error={error} onExit={exitModal}/>
            <Modal visible={showAlert} error={alertError} onExit={exitAlert}>
                <div>{alertMessage}</div>
            </Modal>
            <h1>ta te ti</h1>
            <br/> 
            <b>Antes de empezar aclaremos algunas cosas. </b>
            El primer jugador será la cruz X, el segundo el círculo O <br/>
            Si bien la victoria puede parecer obvia sin poner el último símbolo, se necesita que quede asentado en el tablero para determinar al ganador. <br/>
            Sólo podrá jugar en su turno<br/>
            <br/>
            <b>¿Listo? ¿Entendimos eso? ¡Perfecto! Así que ahora veamos qué hay que hacer para jugar.</b> 
            Haga click en crearSala para crear una nueva sala y envie el link a su amigue o compañere  <br/>
            Si, por el contrario, alguien le envió un link, pongalo en su navegador para entrar a la sala (felicidades, es el círculo)  <br/>
            <br/>
            <button onClick={newRoom}>Crear Sala</button>
            <br/>
            <GoBack/>
            </div> 
        </div>
    )
}


export default Tateti;