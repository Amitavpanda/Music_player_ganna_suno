import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from '../redux/services/shazamCore';
import Related from '../components/Related';
import DetailsHeader from '../components/DetailsHeader';
function SongDetails() {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: songData, isFetching : isFetchingSongData, error} = useGetSongDetailsQuery({songid});
    const {data: songRelatedData, isFetching : isFetchingSongRelatedData, error : SongRelatedError} = useGetSongsRelatedQuery({songid});
    console.log(songid);
    console.log("SongRelated Data");
    console.log(songRelatedData);
    if(error){
      console.log(error.meesage);
    }
    if(SongRelatedError){
      console.log(SongRelatedError.message);
    }
    if(isFetchingSongData || isFetchingSongRelatedData) return <Loader title= "Loading Song Details...." />
  return (
    <div className='flex flex-col'>
      {/* Details Header */}
      <DetailsHeader songid={songid} songData={songData} header="Song"/>
      {/* Play buttons */}
      <div></div>
      {/* Lyrics */}
      <div className='mt-5 bg-skyColor rounded-lg px-4 py-4'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        <div className='mt-2'>{songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line,i) => (
          <p key={i} className='text-white text-xl'>{line}</p>
        )) : <p className='text-white text-xl'>Sorry, no lyrics found!</p>}</div>
      </div>
      
    </div>
  )
}

export default SongDetails;