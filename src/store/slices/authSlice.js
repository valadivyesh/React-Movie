import { createSlice } from '@reduxjs/toolkit'

const DEMO_USER = { name: 'Demo User', email: 'demo@cinemate.com', avatar: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null
  },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload
      const stored = JSON.parse(localStorage.getItem('cinemate_users') || '[]')
      const found = stored.find(u => u.email === email && u.password === password)
      if (found) {
        state.user = { name: found.name, email: found.email, avatar: found.avatar || null }
        state.isAuthenticated = true
        state.error = null
      } else if (email === 'demo@cinemate.com' && password === 'demo123') {
        state.user = DEMO_USER
        state.isAuthenticated = true
        state.error = null
      } else {
        state.error = 'Invalid email or password.'
      }
    },
    register: (state, action) => {
      const { name, email, password } = action.payload
      const stored = JSON.parse(localStorage.getItem('cinemate_users') || '[]')
      if (stored.find(u => u.email === email)) {
        state.error = 'Email already registered.'
        return
      }
      stored.push({ name, email, password })
      localStorage.setItem('cinemate_users', JSON.stringify(stored))
      state.user = { name, email, avatar: null }
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { login, register, logout, updateProfile, clearError } = authSlice.actions
export default authSlice.reducer
