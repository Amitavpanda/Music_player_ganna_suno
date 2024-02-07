import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  genreListId: '',
  isMusicPlayerVisible : true,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.songs;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
      state.isMusicPlayerVisible = true;
    },

    nextSong: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.currentSongs.length;
      state.activeSong = state.currentSongs[state.currentIndex];
      state.isActive = true;
    },

    prevSong: (state) => {
      state.currentIndex = state.currentIndex === 0 ? state.currentSongs.length - 1 : state.currentIndex - 1;
      state.activeSong = state.currentSongs[state.currentIndex];
      state.isActive = true;
    },

    playPause: (state, action ) => {
      state.isPlaying = action.payload;
    },
    musicPlayerVisible : (state, action) => {
      state.isMusicPlayerVisible = action.payload;
    },

    selectGenreListId: (state, action ) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId, musicPlayerVisible } = playerSlice.actions;

export default playerSlice.reducer;
