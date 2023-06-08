import React from 'react';
import { useState } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

export default function AudioPlayer({url}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();
  
    const toggleAudio = () => {
      const audioElement = audioRef.current;
  
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
  
    };
  
    return (
      <div>
        <audio ref={audioRef} src={url} />
        <button onClick={toggleAudio}>{isPlaying ? <AiOutlinePauseCircle size={30}/> : <AiOutlinePlayCircle size={30}/>}</button>
      </div>
    )
};

