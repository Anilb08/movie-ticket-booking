import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bookedMovies, setBookedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingUpdated, setBookingUpdated] = useState(false); // Trigger re-fetching on update
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    // Fetch user information
    axios
      .get('http://localhost:5000/user/info', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch user information:', err);
      });

    // Fetch booked movies only when the component mounts or when bookingUpdated changes
    fetchBookedMovies(token);

  }, [navigate, bookingUpdated]); // Add bookingUpdated as a dependency to trigger refetch

  const fetchBookedMovies = (token) => {
    axios
      .get('http://localhost:5000/user/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBookedMovies(response.data);
        setError(''); // Clear error if fetching succeeds
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch booked movies:', err);
        setBookedMovies([]); // Reset movies to empty array on failure
        setError('Failed to fetch booked movies'); // Display error for failed fetch
        setLoading(false);
      });
  };

  const handleCancelBooking = (bookingId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBookingUpdated((prev) => !prev); // Trigger a re-fetch
      })
      .catch((err) => {
        console.error('Failed to cancel booking:', err);
        setError('Failed to cancel booking');
      });
  };

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* User Info - Always Display */}
          <div className="user-info">
            {userInfo ? (
              <>
                <h3>{userInfo.name}</h3>
                <p>Email: {userInfo.email}</p>
              </>
            ) : (
              <p className="error">Failed to fetch user information</p>
            )}
          </div>

          {/* Booked Movies Section */}
          <div className="booked-movies">
            <h3>Booked Movies</h3>
            {bookedMovies.length > 0 ? (
              <ul>
                {bookedMovies.map((movie) => (
                  <li key={movie.id}>
                    <h4>{movie.title}</h4>
                    <img src={movie.posterUrl} alt={movie.title} className="poster" />
                    <p>{movie.genre}</p>
                    <p>{movie.language}</p>
                    <button
                      onClick={() => handleCancelBooking(movie.bookingId)}
                      className="cancel-button"
                    >
                      Cancel Booking
                    </button>
                  </li>
                ))}
              </ul>
            ) : error && bookedMovies.length === 0 ? (
              <p>No movies booked yet.</p>
            ) : (
              <p>Something went wrong while fetching movies.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
