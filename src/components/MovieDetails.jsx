import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Fetch movie details
    const movieData = {
      1: { title: 'Bhul Bhulaiya 3', genre: 'Comedy/Horror', posterUrl: '/path/to/m1.avif' },
      2: { title: 'Singham Again', genre: 'Action/Drama', posterUrl: '/path/to/m2.avif' },
      // Add other movie data here
    };
    setMovie(movieData[movieId]);

    // Fetch available seats for the movie
    fetch(`/api/seats?movieId=${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableSeats(data.filter(seat => seat.isBooked === 0)); // Only show available seats
      })
      .catch((error) => console.error('Error fetching seats:', error));
  }, [movieId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId); // Deselect seat
      } else {
        return [...prev, seatId]; // Select seat
      }
    });
  };

  const handleBookSeats = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to book.');
      return;
    }

    // Make an API call to book the selected seats
    fetch('/api/bookSeats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId,
        seats: selectedSeats,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Booking confirmed!');
        // Optionally, navigate to a confirmation page or update state
      })
      .catch((error) => console.error('Error booking seats:', error));
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.genre}</p>
      <img src={movie.posterUrl} alt={movie.title} />

      <h3>Select Seats:</h3>
      <div className="seats-container">
        {availableSeats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatSelect(seat.id)}
            style={{
              backgroundColor: selectedSeats.includes(seat.id) ? 'green' : 'gray',
            }}
          >
            Seat {seat.seatNumber}
          </button>
        ))}
      </div>

      <button onClick={handleBookSeats}>Confirm Booking</button>
    </div>
  );
};

export default MovieDetails;
