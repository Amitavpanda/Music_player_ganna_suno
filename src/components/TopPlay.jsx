import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {
  
  return (
    <div className="w-full flex flex-row items-center hover:bg-white/10 rounded-lg py-2 p-4 cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i+1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-12 h-12 rounded-lg" src={ song?.images?.coverart} alt={song?.title} />
        <div className=" flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-base font-bold text-skyColor">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-sm text-white">{song?.subtitle}</p>
          </Link>
        </div>
        <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick}
        />
      </div>
    </div>
  );
};
function TopPlay() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (error) {
    console.log(error.message);
  }
  const songs = data?.tracks;
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  });
  const topPlays = songs?.slice(0, 5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = ({song,i}) => {
    dispatch(setActiveSong({song,songs,i}));
    dispatch(playPause(true));
  }

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer"> See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song,i)}/>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer"> See More</p>
          </Link>
        </div>
        <div>

        </div>
        <Swiper
        slidesPerView="auto"
        spaceBetween={5}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4">
        
        {topPlays?.map((song,i) => (
          <SwiperSlide  key={song?.key}
          style={{ width: '25%', height: '50%'}}
          className=" shadow-lg rounded-full animate-slideright"
          >
            <img src={song?.images.background} alt="name" className="rounded-full w-20 object-cover"/>
          </SwiperSlide>
        ))}


        </Swiper>
      </div>
    </div>
  );
}

export default TopPlay;
