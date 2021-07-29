import React from 'react';
import BackgroundMP4 from '../img/RpslsBackground.mp4';
import BackgroundPNG from '../img/RpslsBackground.png';
import ReactPlayer from 'react-player'

const RpslsBackground = () => {
    return(
        <div>
          <ReactPlayer url={BackgroundMP4} fallback={BackgroundPNG} className='react-player'playing loop width='100%' height='100%'/>
        </div>
    )
}

export default RpslsBackground;