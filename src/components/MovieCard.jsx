import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist } from '../store/slices/moviesSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
        alt={movie.Title}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/300x450?text=Image+Not+Found';
        }}
        style={{ height: '350px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{movie.Title}</Card.Title>
        <Card.Text>
          Year: {movie.Year}
        </Card.Text>
        <div className="mt-auto d-flex flex-column gap-2">
          <Button 
            as={Link} 
            to={`/movie/${movie.imdbID}`} 
            variant="primary" 
          >
            View Details
          </Button>
          {isAuthenticated && (
            <Button 
              variant="outline-success" 
              size="sm"
              onClick={() => dispatch(addToWatchlist(movie))}
            >
              Add to Watchlist
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
