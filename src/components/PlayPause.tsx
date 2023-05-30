import React from 'react';
import { FaPauseCircle, FaPlayCircle} from "react-icons/fa";

interface PlayPauseProps{
  isPlaying : boolean;
  activeSong : {
    title: string;
  } | null;
  song?: {
    title: string;
  };
  handlePause : () => void;
  handlePlay : () => void;
}
const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay } : PlayPauseProps) => (isPlaying && activeSong?.title === song?.title ? (
  <FaPauseCircle
    size={50}
    className='text-skyColor'
    onClick={handlePause}
  />
) : (
  <FaPlayCircle
  size={50}
  className='text-skyColor'
  onClick={handlePlay}
  />
));

  

export default PlayPause;