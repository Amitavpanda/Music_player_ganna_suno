import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import Error from '../components/Error';
import ArtistCard from '../components/ArtistCard';

function TopArtists() {
    const {data, isFetching, error} = useGetTopChartsQuery();
    const tracks = data?.tracks;
    console.log(tracks);
    if(isFetching) return <Loader title=" Loading Top Artists"/>
    if(error) return <Error />
  return (
    <div className='flex flex-col'>
        <div className='flex-1 flex flex-col items-center'>
            <h1 className='text-4xl text-white font-bold mb-5'>Top Artists</h1>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {tracks?.map((track) => (
                <ArtistCard key={track.key} track={track} />
            ))}
        </div>

    </div>
  )
}

export default TopArtists
