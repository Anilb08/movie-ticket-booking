import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
  const { movieId } = useParams();  // Get movieId from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // Track if the user has booked or not
  const [bookingId, setBookingId] = useState(null);  // Track the booking ID
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Get the token from localStorage

  // Fetch movie details based on movieId
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/movies/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
        })
        .then((response) => {
          setMovieDetails(response.data);  // Store movie details in state
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    } else {
      console.error('Token not found!');
    }
  }, [movieId, token]);

  // Check booking status for the movie
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/bookings/check/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
        })
        .then((response) => {
          setIsBooked(response.data.isBooked);
          if (response.data.isBooked) {
            setBookingId(response.data.bookingId);  // Store the bookingId if booked
          }
        })
        .catch((error) => {
          console.error('Error checking booking status:', error);
        });
    } else {
      console.error('Token not found!');
    }
  }, [movieId, token]);
  

  // Handle booking the movie
  const handleBookNow = () => {
    if (!token) {
      alert('You need to log in first!');
      return;
    }
  
    axios
      .post(
        `http://localhost:5000/bookings`,
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } } // Attach token in headers
      )
      .then((response) => {
        setIsBooked(true);  // Update booking status
        setBookingId(response.data.bookingId);  // Store the bookingId for cancellation
        alert('Booking successful!');
        navigate('/profile', { state: { bookingUpdated: true } }); 
      })
      .catch((error) => {
        console.error('Error booking movie:', error);
        alert('Booking failed. Please try again.');
      });
  };
  
  // Handle cancelling the booking
  const handleCancelBooking = async () => {
    if (!bookingId) {
      console.error('Booking ID not found');
      alert('Booking ID not found. Please try again later.');
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // After successful cancellation, reset the booking state
      setIsBooked(false);
      setBookingId(null);
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking');
    }
  };
  
  if (!movieDetails) {
    return <div>Loading...</div>; // Loading state until movie details are fetched
  }

  return (
    <div className="booking-page-container">
    <div className="movie-details-container">
      <img
        src={movieDetails.PosterUrl}
        alt={movieDetails.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h2>{movieDetails.title}</h2>
        <p><strong>Genre:</strong> {movieDetails.genre}</p>
        <p><strong>Language : </strong> {movieDetails.language}</p>
        
      </div>
    </div>
  
    <div className="booking-actions">
      {isBooked ? (
        <button onClick={handleCancelBooking} className="cancel-booking-button">
          Cancel Booking
        </button>
      ) : (
        <button onClick={handleBookNow} className="book-now-button">
          Book Now
        </button>
      )}
    </div>
  </div>
  
  );
};

export default BookingPage;
