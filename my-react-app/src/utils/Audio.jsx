import React from 'react';
import { useState, useCallback } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

function AudioPlayer({url}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();
    // console.log('audio di render');
  
    const toggleAudio = useCallback(() => {
      const audioElement = audioRef.current;
    
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }, [audioRef, isPlaying]);
  
    return (
      <div>
        <audio ref={audioRef} src={url} />
        <button onClick={toggleAudio}>{isPlaying ? <AiOutlinePauseCircle size={30}/> : <AiOutlinePlayCircle size={30}/>}</button>
      </div>
    )
}

const MemoizedAudioPlayer = React.memo(AudioPlayer, (prev, next) => {
  return prev.value === next.value;
});

export default MemoizedAudioPlayer;

