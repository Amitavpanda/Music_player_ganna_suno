import React from 'react'
import { useNavigate } from 'react-router-dom'
function ArtistCard({track}) {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-pluse rounded-lg cursor-pointer' onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
      <img src={track?.images?.background} alt={track?.subtitle} className='w-full h-56 rounded-lg'/>
      <p className='mt-4 font-bold text-skyColor text-lg truncate'>
        {track?.subtitle}
      </p>
    </div>
  )
}

export default ArtistCard;
