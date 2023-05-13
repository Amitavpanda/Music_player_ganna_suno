import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { type } from '@testing-library/user-event/dist/type';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';
function Search() {
    const {searchTerm} = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery({searchTerm});

    const songs = data?.tracks?.hits.map((song) => song.track);
    console.log(songs);
    console.log(typeof songs);

    if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;
  return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-center mt-4 mb-10 '>
            Showing results for <span className='text-skyColor'>{searchTerm}</span>
        </h2>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
