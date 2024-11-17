import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after successful login or booking
import './Home.css';
import m1 from '../components/images/m1.avif';
import m2 from '../components/images/m2.avif';
import m3 from '../components/images/m3.avif';
import m4 from '../components/images/m4.avif';
import m5 from '../components/images/m5.avif';
import m6 from '../components/images/m6.avif';

// Movie data
const movies = [
  { id: 1, title: 'Bhul Bhulaiya 3', genre: 'Comedy/Horror', posterUrl: m1 },
  { id: 2, title: 'Singham Again', genre: 'Action/Drama', posterUrl: m2 },
  { id: 3, title: 'Venom: The Last Dance', genre: 'Action/Adventure/Sci-Fi', posterUrl: m3 },
  { id: 4, title: 'Kangua', genre: 'Action/Adventure', posterUrl: m4 },
  { id: 5, title: 'Amaran', genre: 'Action/Drama', posterUrl: m5 },
  { id: 6, title: 'Phulwanti', genre: 'Drama/Romantic', posterUrl: m6 },
];

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated by checking the token in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  const handleBookNow = (movieId) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(`/movies/${movieId}/booking`);
    }
  };

  const handleLogin = async () => {
    // Mock login function (replace with actual API logic)
    const token = 'your-token-here';  // This should come from your backend after successful login
    localStorage.setItem('token', token);  // Store token in localStorage
    setShowLoginModal(false);
    alert('Logged in successfully! You can now book a ticket.');
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className={`home-container ${showLoginModal ? 'blurred' : ''}`}>
      <h1 className="home-title text-4xl font-bold text-gray-800 my-6 text-center">
        Now Showing
      </h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            <h3 className="movie-title"><b>{movie.title}</b></h3>
            <p className="movie-genre">{movie.genre}</p>
            <button
              onClick={() => handleBookNow(movie.id)}
              style={{ backgroundColor: '#f16281', marginBottom: 10 }}
              className="mt-4 text-white px-16 py-2 rounded-md hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Please log in to continue booking</h2>
            <button onClick={handleLogin} className="btn-modal">
              Login
            </button>
            <button onClick={handleCloseModal} className="btn-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
