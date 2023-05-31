import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery : fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers)  => {
            headers.set('X-RapidAPI-Key','a077d4ae88msh5db07536f6a793dp164e40jsn2328fd514507');
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({query:  () => '/charts/track', cacheKey: 'getTopCharts',}),
        getSongDetails : builder.query({query: ({songid}) => `/songs/get-details?key=${songid}`, cacheKey: 'getSongDetails',}),
        getSongsRelated: builder.query({query: ({songid}) => `/songs/list-recommendations?key=${songid}&locale=en-US` , cacheKey: 'getSongsRelated', }),
        getArtistDetails: builder.query({query: ({artistid}) => `artists/get-details?id=${artistid}`, cacheKey: 'getArtistDetails',}),
        getArtistTopSongs : builder.query({query: ({artistid}) => `artists/get-top-songs?id=${artistid}`, cacheKey: 'getArtistTopSongs',}),
        getSongsBySearch : builder.query({query: ({searchTerm}) => `/search?term=${searchTerm}`, cacheKey: 'getSongsBySearch',}),


    }),
});

export const {useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongsRelatedQuery, useGetArtistDetailsQuery, useGetArtistTopSongsQuery, useGetSongsBySearchQuery} = shazamApi;