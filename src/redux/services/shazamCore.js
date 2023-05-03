import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery : fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers)  => {
            headers.set('X-RapidAPI-Key','f0e2ea42a6msh3f997ed18dd98b2p1dbd19jsn0fc3c3d11f51');
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({query:  () => '/charts/track'}),
    }),
});

export const {useGetTopChartsQuery} = shazamApi;