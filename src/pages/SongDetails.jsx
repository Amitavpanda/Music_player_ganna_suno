import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Error from '../components/Error';
import Loader from '../components/Loader';
import RelatedSongs from '../components/RelatedSongs';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
function SongDetails() {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: songData, isFetching : isFetchingSongData, error} = useGetSongDetailsQuery({songid});
    console.log(songData);
    if(error){
      console.log(error.message);
    }
    if(isFetchingSongData) return <Loader title= "Loading Song Details...." />
  return (
    <div className='flex flex-col'>
      {/* Details Header */}
      <div className='flex-1 flex flex-col items-center '>
        <h2 className='text-5xl text-white font-bold mb-5'>Song Details</h2>
        <img className='rounded-lg w-80 h-60' src={songData?.images?.coverart} alt={songData?.title}/>
        <p className='font-bold text-lg text-skyColor truncate mt-1'>{songData?.title}</p>
        <p className='text-sm truncate text-white mt-1'>{songData?.subtitle}</p>
        <p className='text-sm truncate text-gray-300 mt-1'>{songData?.genres?.primary}</p>
      </div>
      {/* Play buttons */}
      <div></div>
      {/* Lyrics */}
      <div className='mt-5 bg-skyColor rounded-lg px-4 py-4'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        <div className='mt-2'>{songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line,i) => (
          <p className='text-white text-xl'>{line}</p>
        )) : <p className='text-white text-xl'>Sorry, no lyrics found!</p>}</div>
      </div>
    </div>
  )
}

export default SongDetails;