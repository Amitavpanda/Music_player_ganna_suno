import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ArtistDetails{
  attributes: {
    artwork: {
      url: string;
    }
    name : string;
  }
}
interface SongData {
  images?: {
    coverart : string;
  };
  title: string;
  subtitle: string;
  genres?: {
    primary: string;
  };
}

interface DetailsHeaderProps{
  artistid : string;
  songid : string;
  songData : SongData;
  header: string;
  artistdetails : ArtistDetails;
}

function DetailsHeader({artistid, songid, songData, header, artistdetails} : DetailsHeaderProps ) {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex-1 flex flex-col items-center '>
        <h2 className='text-4xl text-white font-bold mb-5'>{header} Details</h2>
        <img className='rounded-lg w-600 h-500' src={artistid ? artistdetails?.attributes?.artwork?.url
    ?.replace("{w}", "4000")
    .replace("{h}", "500") : songData?.images?.coverart} alt={songData?.title}/>
        <p className='font-bold text-lg text-skyColor truncate mt-1'>{ artistid ? artistdetails?.attributes?.name : songData?.title}</p>
        {!artistid && (
        <p className='text-sm truncate text-white mt-1' onClick={() => navigate(`artists/`)}>{songData?.subtitle}</p>
        )}
        {!artistid && (
        <p className='text-sm truncate text-gray-300 mt-1'>{songData?.genres?.primary}</p>
        )}

      </div>
    </div>
  )
}

export default DetailsHeader
