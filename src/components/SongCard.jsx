import React, {useState, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { AiFillHeart, AiOutlineHeart  } from 'react-icons/ai';
import PlayPause from './PlayPause';
import { likeSongCard } from '../api/firestoreAPI';
import { getLikesByUser } from '../api/firestoreAPI';
function SongCard({song,i, isPlaying , activeSong, songs}) {
  const [liked, setLiked] = useState(false);

  const songID = song?.key;
  const user = useSelector((state) => state.user);
  const userID = user?.user?.userId
  console.log("user id is ", userID);

  console.log("like status", liked);
  useMemo(() => {
    getLikesByUser(userID,songID,setLiked);
  },[]);
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  const handlePlayCLick = () => {
    dispatch(setActiveSong({song,songs,i}));

    dispatch(playPause(true));
  }

  const handleLike = () => {
    likeSongCard(songID,userID,liked);
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
          <div className='flex flex-row justify-between items-center'>
            <div className='mt-4 flex flex-col'>
              <p className='font-bold text-lg text-skyColor truncate'>
                <Link to={`/songs/${song?.key}`}>{song.title.length > 10 ? `${song.title.substring(0, 10)}...` : song.title}</Link>
              </p>
              <p className='text-sm truncate text-white mt-1'>
                <Link to={song.artists? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
                {song.subtitle.length > 10 ? `${song.subtitle.substring(0, 10)}...` : song.subtitle}
                </Link> 
              </p>
            </div>
            <div onClick={handleLike}>{liked ? <AiFillHeart size={40} color='red'/> : <AiFillHeart size={40} color='white' />}</div>
          </div>
          
        </div>
      ) : null}
    </>
  )
}


export default SongCard
