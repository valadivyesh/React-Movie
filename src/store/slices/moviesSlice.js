import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get API Key from env
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

// Thunk to fetch popular movies (OMDB doesn't have a popular endpoint, so we search for a common term)
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=marvel&type=movie`);
      return response.data.Search;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to search movies
export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${query}&type=movie`);
      return response.data.Search || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    searchResults: [],
    selectedMovie: null,
    watchlist: [], // Add watchlist
    loading: false,
    error: null,
  },
  reducers: {
    clearDetails: (state) => {
      state.selectedMovie = null;
    },
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      if (!state.watchlist.find(m => m.imdbID === movie.imdbID)) {
        state.watchlist.push(movie);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(m => m.imdbID !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDetails, addToWatchlist, removeFromWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
