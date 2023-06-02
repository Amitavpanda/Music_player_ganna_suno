import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

function SongCard({song,i, isPlaying , activeSong, songs}) {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  const handlePlayCLick = () => {
    dispatch(setActiveSong({song,songs,i}));
    dispatch(playPause(true));
  }
  return (
    <>
      {song.images?.coverart ? (
        <div className='flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-pluse rounded-lg cursor-pointer'>
          <div className='relative w-full h-56 group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
              <PlayPause 
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song} 
              handlePause={handlePauseClick}
              handlePlay = {handlePlayCLick}/>
            </div>
            < img alt='song_img' src={song.images?.coverart} />
          </div>
          <div className='mt-4 flex flex-col'>
            <p className='font-bold text-lg text-skyColor truncate'>
              <Link to={`/songs/${song?.key}`}>{song.title}</Link>
            </p>
            <p className='text-sm truncate text-white mt-1'>
              <Link to={song.artists? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
                {song.subtitle}
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SongCard
