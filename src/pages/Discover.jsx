import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import Error from "../components/Error";
import Loader from "../components/Loader";
import SongCard from "../components/SongCard";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
function Discover() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {data, isFetching, error} = useGetTopChartsQuery();
  // console.log(data);  
  if(error){
    console.log(error.message);
  }
  const songs = data?.tracks
  // console.log(songs);

  songs?.map((song) => console.log(song));
  if(isFetching) return <Loader title= "Loading Songs...." />

  if(error) return <Error/>
  return (
    <div className=" relative flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
      </div> 
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songs?.map((song,i) => (
            <SongCard 
            key={song.key}
            
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}

             songs={songs} />
          ))}
      </div>

    </div>
  );
}

export default Discover;
