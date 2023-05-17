import React from 'react'
import {BsFillSkipStartFill,BsFillSkipEndFill, BsPlayCircleFill} from "react-icons/bs";
import {BsArrowRepeat,BsPauseCircleFill,BsFillPlayCircleFill,BsShuffle} from "react-icons/bs";
function Controls({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) {
  return (
    <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
      <BsArrowRepeat size={20} color={repeat ? '#76CCFB' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
      {currentSongs?.length && <BsFillSkipStartFill size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
      {isPlaying ? (
      <BsPauseCircleFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayCircleFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
        {currentSongs?.length && <BsFillSkipEndFill size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
        <BsShuffle size={20} color={shuffle ? '#76CCFB' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    </div>
  )
}

export default Controls;
