import React,{ useState} from 'react';
import rock from '../img/rockyellow.png';
import paper from '../img/paperyellow.png';
import scissor from '../img/scissoryellow.png';
import lizard from '../img/lizardyellow.png';
import spock from '../img/spockyellow.png';

function ImageMoves({playMove}){
    return(
        <div>
            <img src={rock} alt="imgRock" onClick={()=>{playMove(1)}}></img>
            <img src={paper} alt="imgPaper" onClick={()=>{playMove(2)}}></img>
            <img src={scissor} alt="imgScissor" onClick={()=>{playMove(3)}}></img>
            <img src={lizard} alt="imgLizard" onClick={()=>{playMove(4)}}></img>
            <img src={spock} alt="imgRock" onClick={()=>{playMove(5)}}></img>
        </div>
    )
}
export default ImageMoves;