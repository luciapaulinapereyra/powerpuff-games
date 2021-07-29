import React, { useState } from "react";
import rest from "../../common/rest";
import Modal from "../../components/Modal/Modal";
import RulesHangman from "./componentsHangman/RulesHangman";
import WrongLetters from "./componentsHangman/WrongLetters";
import GoBack from "../../components/GoBack";
import "./css/indexHangman.css";
import Images from "./componentsHangman/Man";
const URL = "http://localhost:5000/hangman";

const Hangman = () => {
  //States
  const [roomID, setRoomID] = useState(null);
  const [tries, setTries] = useState(0);
  const [letter, setLetter] = useState("");
  const [wordProgress, setWordProgress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [message, setMessage] = useState("");
  const [arrFailed, setArrFailed] = useState([]);
  const [error, setError] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [correctWord, setCorrectWord] = useState("");

  //End of States

  // Create a room and prepare it to play
  const createRoom = async () => {
    let room;
    try {
      room = await rest.post(`${URL}/rooms`, {});
      if (room.error) throw new Error(room.message);
    } catch (error) {
      showModalOnScreen(true, error.message);
      return;
    }
    setRoomID(room.id);
    setTries(room.tries);
    setWordProgress(room.wordProgress);
    setCorrectWord("");
    setArrFailed([]);
    setMessage(room.message);
    setMatchFinished(false);
    // Update the states with the new created room 'room'
  };

  // depends on the letter parameter, send a word or a letter
  const playLetter = async (letter) => {
    let play = {}; //this is sending to the back
    if (letter.length > 1) {
      play = {
        word: letter,
      };
    } else {
      play = {
        letter,
      };
    }
    let response;
    try {
      response = await rest.put(`${URL}/rooms/${roomID}`, play);
      if (response.error) throw new Error(response.message);
    } catch (error) {
      showModalOnScreen(true, error.message);
      return;
    }
    if (response.failed) {
      setArrFailed([...arrFailed, response.letter]);
      setTries(response.tries);
      setMatchFinished(response.matchFinished);
      setMessage(response.message);
      setCorrectWord(response.correctWord);
      return;
    }
    setWordProgress(response.wordProgress);
    setMatchFinished(response.matchFinished);
    setMessage(response.message);
  };

  // Send to the back to surrender
  const surrender = async () => {
    const response = await rest.delete(`${URL}/rooms/${roomID}`);
    setMatchFinished(response.matchFinished);
    showModalOnScreen(response.error, response.message);
    setCorrectWord(response.correctWord);
    setTries(7);
  };

  // Show a message in the screen, it can be a error or not
  const showModalOnScreen = (error, msg) => {
    setShowModal(true);
    setModalMessage(msg);
    if (error) setError(true);
  };

  // function that is executed when we close the modal
  const exitModal = () => {
    setShowModal(false);
    setModalMessage("");
    setError(false);
  };
  const exitModalRules = () => {
    setShowRules(false);
  };

  return (
    <div className="container-general" id="body-hangman">
      {/* modal */}
      <Modal visible={showRules} error={false} onExit={exitModalRules}>
        <RulesHangman />
      </Modal>
      <Modal visible={showModal} error={error} onExit={exitModal}>
        <div>{modalMessage} </div>
      </Modal>
      {/* end of modal */}

      <h1 className="titleLetters">Ahorcado</h1>

      {/*images + tries*/}
      <div className="container-hangman">
        <div className="container-elements">
          <div id="cajaImagenes">
            <h1 id="tries">Intentos: {tries}</h1>
            <div id="imagenes">
              <Images tries={tries} />
            </div>
          </div>
        </div>
        {/* end of images + tries*/}
        {/*stripes + send button + input + messages + correct words*/}
        <div className="container-elements">
          <div id="container-word">
            {wordProgress.map((word, i) => (
              <div id="word" key={i}>
                {word ? word : "_"}
              </div>
            ))}
          </div>
          <br></br>
          <input
            type="text"
            id="send"
            onChange={(e) => setLetter(e.target.value)}
          ></input>
          <br></br>
          <button className="buttonsHangman" onClick={() => playLetter(letter)}>
            {letter.length > 1 ? "Arriesgar palabra" : "Jugar letra"}
          </button>
          <h1 id="messages">{message}</h1>
          {matchFinished && correctWord && (
            <p className="parrafos">Palabra correcta: {correctWord}</p>
          )}
        </div>
        {/*end of stripes + send button + input + messages + correct words */}

        <div className="container-elements">
          {/*lista de letras incorrectas*/}
          <WrongLetters wrongLettersArray={arrFailed} />
          {/* fin de lista de letras incorrectas*/}
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="container-hangman">
        {/*buttons down*/}
        {roomID === null && (
          <button className="buttonsHangman" onClick={createRoom}>
            Empezar a jugar
          </button>
        )}

        {matchFinished && (
          <button className="buttonsHangman" onClick={createRoom}>
            Jugar de nuevo
          </button>
        )}
        {!matchFinished && roomID != null && (
          <button className="buttonsHangman" onClick={surrender}>
            Rendirse
          </button>
        )}
        <button
          className="buttonsHangman"
          onClick={() => {
            setShowRules(!showRules);
          }}
        >
          Mostrar Reglas
        </button>
        {roomID === null && <GoBack css={"buttonsHangman"} />}
        {matchFinished && <GoBack css={"buttonsHangman"} />}

        <p className="parrafos">
          ID de room = {roomID == null ? "No asignada" : roomID}
        </p>
        {/* end of buttons down*/}
      </div>
    </div>
  );
};

export default Hangman;
