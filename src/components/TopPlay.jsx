import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import { useNavigate } from "react-router-dom";

import 'swiper/swiper.min.css'
import SongBar from "./SongBar";



function TopPlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id: artistid} = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  console.log(data);
  if (error) {
    console.log(error.message);
  }
  const songs = data?.tracks;
  // songs?.map((song) => (
  //   console.log("background ",song?.images?.background)
  // ));
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const topPlays = songs?.slice(0, 5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
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
          <Link to="/">
            <p className="text-gray-300 text-base cursor-pointer"> See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i ) => (
            <SongBar key={`${song.key}-${artistid}`} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song,i)}/>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
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
        
        {topPlays?.map((song, i) => (
          <SwiperSlide  key={song?.key}
          style={{ width: '25%', height: '50%'}}
          className=" shadow-lg rounded-full animate-slideright cursor-pointer"
          onClick={() => navigate(`/artists/${song?.artists?.[0]?.adamid}`)}
          >
            
            <img src={song?.images?.background} alt={song?.title} className="rounded-full w-20 object-cover"/>
            {/* <img src={song?.images?.background} alt="name" className="rounded-full w-20 object-cover"/> */}
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopPlay;
