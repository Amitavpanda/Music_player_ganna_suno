import React from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
function SongBar({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistid,
  topSong,
}) {
  return (
    <div className="w-full flex flex-row items-center hover:bg-white/10 rounded-lg py-2 p-4 cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-12 h-12 rounded-lg"
          src={
            artistid
              ? topSong?.attributes?.artwork?.url
                  ?.replace("{w}", "200")
                  .replace("{h}", "200")
              : song?.images?.coverart
          }
          alt={song?.title}
        />

        <div className=" flex-1 flex flex-col justify-center mx-3">
          {!artistid ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-base font-bold text-skyColor">{song?.title}</p>
            </Link>
          ) : (
            
            <p className="text-base font-bold text-skyColor">
              {topSong?.attributes?.name}
            </p>
          )}
          {!artistid ? (
            <Link to={`/artists/${song?.artists[0].adamid}`}>
              <p className="text-sm text-white">{song?.subtitle}</p>
            </Link>
          ) : (
            <p className="text-sm text-white">
              {topSong?.attributes?.artistName}
            </p>
          )}
        </div>
        {!artistid ? (
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SongBar;
