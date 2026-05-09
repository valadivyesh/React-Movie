import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (query.trim().length > 2) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(searchMovies(query));
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, dispatch]);

  return (
    <Container>
      <h2 className="mb-4">Search Movies</h2>
      <Form.Group className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="Type to search movies..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
        />
      </Form.Group>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && searchResults.length === 0 && query.trim().length > 2 && (
        <p className="text-center text-muted">No movies found for "{query}"</p>
      )}

      <Row xs={1} md={2} lg={4} className="g-4">
        {searchResults.map((movie) => (
          <Col key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;
