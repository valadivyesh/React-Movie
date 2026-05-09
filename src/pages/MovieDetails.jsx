import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Badge, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, clearDetails } from '../store/slices/moviesSlice';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    return () => dispatch(clearDetails());
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
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

  if (!selectedMovie) return null;

  return (
    <Container className="py-4">
      <Row>
        <Col md={4} className="mb-4">
          <Image 
            src={selectedMovie.Poster && selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
            fluid 
            rounded 
            className="shadow"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/300x450?text=Image+Not+Found';
            }}
          />
        </Col>
        <Col md={8}>
          <h1>{selectedMovie.Title}</h1>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2">{selectedMovie.Year}</Badge>
            <Badge bg="info" className="me-2">{selectedMovie.Rated}</Badge>
            <Badge bg="success">{selectedMovie.Runtime}</Badge>
          </div>
          
          <p className="lead">{selectedMovie.Plot}</p>
          
          <ListGroup variant="flush" className="mt-4">
            <ListGroup.Item><strong>Genre:</strong> {selectedMovie.Genre}</ListGroup.Item>
            <ListGroup.Item><strong>Director:</strong> {selectedMovie.Director}</ListGroup.Item>
            <ListGroup.Item><strong>Cast:</strong> {selectedMovie.Actors}</ListGroup.Item>
            <ListGroup.Item><strong>Released:</strong> {selectedMovie.Released}</ListGroup.Item>
            <ListGroup.Item><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
