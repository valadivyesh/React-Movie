import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading movies...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Popular Movies</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {popularMovies.map((movie) => (
          <Col key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
