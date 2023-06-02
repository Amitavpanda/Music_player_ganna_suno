import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import SongBar from './SongBar';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

function Related({artistTopSongs, artistid,title}) {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (topSong,i) => {
    dispatch(setActiveSong({topSong,artistTopSongs,i}));
    dispatch(playPause(true));
  }
  return (
    <div>
    <div className="flex flex-col">
      <h1 className='text-white font-bold text-xl'>{title}</h1>
      {artistTopSongs?.map((topSong,i) => (
        <SongBar key={`${topSong.key}-${artistid}`} artistid={artistid} topSong={topSong} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(topSong,i)}/>
      ))}
      
    </div>
  </div>
  )


}

export default Related
