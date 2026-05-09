import { createSlice } from '@reduxjs/toolkit'

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    favorites: [],
    watchlist: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload
      const idx = state.favorites.findIndex(m => m.imdbID === movie.imdbID)
      if (idx >= 0) {
        state.favorites.splice(idx, 1)
      } else {
        state.favorites.push(movie)
      }
    },
    toggleWatchlist: (state, action) => {
      const movie = action.payload
      const idx = state.watchlist.findIndex(m => m.imdbID === movie.imdbID)
      if (idx >= 0) {
        state.watchlist.splice(idx, 1)
      } else {
        state.watchlist.push(movie)
      }
    },
    clearUserData: (state) => {
      state.favorites = []
      state.watchlist = []
    }
  }
})

export const { toggleFavorite, toggleWatchlist, clearUserData } = userDataSlice.actions
export default userDataSlice.reducer
