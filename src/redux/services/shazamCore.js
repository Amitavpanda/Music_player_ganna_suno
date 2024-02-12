import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


// const shazamApiKey = process.env.REACT_APP_SHAZAM_API_KEY;

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery : fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers)  => {
            headers.set('X-RapidAPI-Key',"a077d4ae88msh5db07536f6a793dp164e40jsn2328fd514507");
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({query:  () => '/charts/track',}),
        getSongDetails : builder.query({query: ({songid}) => `/songs/get-details?key=${songid}`, }),
        getSongsRelated: builder.query({query: ({songid}) => `/songs/list-recommendations?key=${songid}&locale=en-US` ,  }),
        getArtistDetails: builder.query({query: ({artistid}) => `artists/get-details?id=${artistid}`, }),
        getArtistTopSongs : builder.query({query: ({artistid}) => `artists/get-top-songs?id=${artistid}`, }),
        getSongsBySearch : builder.query({query: ({searchTerm}) => `/search?term=${searchTerm}`,}),


    }),
});

export const {useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongsRelatedQuery, useGetArtistDetailsQuery, useGetArtistTopSongsQuery, useGetSongsBySearchQuery} = shazamApi;