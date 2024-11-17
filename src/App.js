import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home'; 
import Navbar from './components/Navbar';
import { AuthProvider } from './components/AuthContext'; 
import MovieDetails from './components/MovieDetails';  // Keep if you need a separate details page
import BookingPage from './components/BookingPage';
import ProfilePage from './components/ProfilePage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/movies/:movieId/booking" element={<BookingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;