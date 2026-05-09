import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchMovies } from '../../services/movieApi'

export const performSearch = createAsyncThunk('search/perform', async ({ query, page, type }, { rejectWithValue }) => {
  try {
    const data = await searchMovies(query, page, type)
    return { ...data, query, page }
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    total: 0,
    page: 1,
    type: '',
    loading: false,
    error: null
  },
  reducers: {
    setQuery: (state, action) => { state.query = action.payload },
    setPage: (state, action) => { state.page = action.payload },
    setType: (state, action) => { state.type = action.payload },
    clearSearch: (state) => {
      state.results = []
      state.total = 0
      state.page = 1
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => { state.loading = true; state.error = null })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload.Search || []
        state.total = parseInt(action.payload.totalResults || 0)
        state.query = action.payload.query
        state.page = action.payload.page
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.results = []
        state.total = 0
      })
  }
})

export const { setQuery, setPage, setType, clearSearch } = searchSlice.actions
export default searchSlice.reducer
