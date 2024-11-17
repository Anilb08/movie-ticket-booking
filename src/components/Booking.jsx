import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Fetch available seats when the component is mounted
  useEffect(() => {
    fetch(`/api/seats/${movieId}`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch((error) => console.error('Error fetching seats:', error));
  }, [movieId]);

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId)); // Deselect the seat
    } else {
      setSelectedSeats([...selectedSeats, seatId]); // Select the seat
    }
  };

  const handleBooking = () => {
    const userId = 1; // Replace this with the actual logged-in user ID
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        movie_id: movieId,
        seat_ids: selectedSeats
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Booking successful!');
      } else {
        alert('Failed to book seats');
      }
    })
    .catch(error => console.error('Error booking seats:', error));
  };

  return (
    <div>
      <h1>Book Seats for Movie</h1>
      <div className="seats-container">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status === 'Booked' ? 'booked' : 'available'}`}
            onClick={() => handleSeatSelection(seat.id)}
          >
            {seat.status === 'Available' ? 'Available' : 'Booked'}
          </div>
        ))}
      </div>
      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>Confirm Booking</button>
    </div>
  );
};

export default Booking;
