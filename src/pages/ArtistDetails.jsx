import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery } from "../redux/services/shazamCore";
import DetailsHeader from "../components/DetailsHeader";
import Loader from "../components/Loader";
import Related from "../components/Related";

function ArtistDetails() {
  const { id: artistid } = useParams();
  const {
    data: getArtistDetails,
    isFetching,
    error,
  } = useGetArtistDetailsQuery({ artistid });
  const { data : getArtistTopSongs, isFetching: fetchingTopSongs, error: topSongsError} = useGetArtistTopSongsQuery({artistid})
  const artistdetails = getArtistDetails?.data[0];
  const artistTopSongs = getArtistTopSongs?.data;
  console.log(artistdetails);
  console.log(artistTopSongs);
  if(isFetching || fetchingTopSongs) return <Loader title="Loading Artist Details .." />
  return (
    <div className="flex flex-col">
      <DetailsHeader artistid={artistid} artistdetails={artistdetails} header="Artist"/>
      <div className="mt-5">
        <Related artistTopSongs={artistTopSongs} artistid={artistid} title="Popular:" />
      </div>
  </div>
  );
}

export default ArtistDetails;
