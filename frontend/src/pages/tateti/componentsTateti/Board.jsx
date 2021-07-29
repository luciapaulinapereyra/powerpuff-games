import React, {useState} from 'react'; 
import board from '../cssTateti/Board.css'

function Board ({playMove, board}) {
    return ( 
        <div className = "board"> 
        <div className = "row"> 
             <div className={"square"} onClick={() => {playMove(0)}}> 
               {board[0] !== null ? board[0] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(1)}}>
               {board[1] !== null ? board[1] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(2)}}>
               {board[2] !== null ? board[2] : ""}
             </div> 
        </div>
        <div className = "row"> 
             <div className={"square"} onClick={() => {playMove(3)}}>
               {board[3] !== null ? board[3] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(4)}}>
               {board[4] !== null ? board[4] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(5)}}>
               {board[5] !== null ? board[5] : ""}
             </div>
        </div>
        <div className = "row"> 
             <div className={"square"} onClick={() => {playMove(6)}}>
               {board[6] !== null ? board[6] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(7)}}>
               {board[7] !== null ? board[7] : ""}
             </div>
             <div className={"square"} onClick={() => {playMove(8)}}>
               {board[8] !== null ? board[8] : ""}
             </div>
        </div>
        </div> 
    )
}

export default Board;