export const getPosterUrl = (poster, imdbId) => {
  if (!poster || poster === 'N/A') {
    return `https://via.placeholder.com/300x445/16161e/555566?text=No+Poster`
  }
  return poster
}

export const getRatingColor = (rating) => {
  const r = parseFloat(rating)
  if (isNaN(r)) return '#9999aa'
  if (r >= 8) return '#4caf50'
  if (r >= 6) return '#f5c518'
  return '#E50914'
}

export const formatRuntime = (runtime) => {
  if (!runtime || runtime === 'N/A') return null
  const mins = parseInt(runtime)
  if (isNaN(mins)) return runtime
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export const truncate = (str, n) => {
  if (!str || str === 'N/A') return ''
  return str.length > n ? str.slice(0, n) + '…' : str
}

export const getYear = (dateStr) => {
  if (!dateStr || dateStr === 'N/A') return ''
  return dateStr.split(' ').pop() || dateStr
}

export const getGenreList = (genre) => {
  if (!genre || genre === 'N/A') return []
  return genre.split(',').map(g => g.trim())
}

export const formatVotes = (votes) => {
  if (!votes || votes === 'N/A') return votes
  const n = parseInt(votes.replace(/,/g, ''))
  if (isNaN(n)) return votes
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return votes
}

export const getTrailerUrl = (title, year) => {
  const q = encodeURIComponent(`${title} ${year || ''} official trailer`)
  return `https://www.youtube.com/results?search_query=${q}`
}

export const getActorList = (actors) => {
  if (!actors || actors === 'N/A') return []
  return actors.split(',').map(a => a.trim()).slice(0, 4)
}
