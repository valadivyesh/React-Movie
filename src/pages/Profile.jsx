import React from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  return (
    <Container className="py-4">
      <Row className="mb-5">
        <Col md={12}>
          <Card className="shadow-sm border-0 bg-light p-4">
            <Card.Body>
              <h2 className="mb-3">User Profile</h2>
              <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
              <p className="mb-0"><strong>Email:</strong> {user?.email}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mb-4">My Watchlist</h3>
      {watchlist.length === 0 ? (
        <Alert variant="info" className="text-center">
          Your watchlist is empty. Go search for some movies!
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          {watchlist.map((movie) => (
            <Col key={movie.imdbID}>
              <div className="position-relative h-100">
                <MovieCard movie={movie} />
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2 opacity-75"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeFromWatchlist(movie.imdbID));
                  }}
                  title="Remove from watchlist"
                >
                  &times;
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Profile;
