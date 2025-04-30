import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectFeed from './pages/ProjectFeed';
import CreateProject from './pages/CreateProject';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<ProjectFeed />} />
          <Route path="/create" element={<CreateProject />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;











