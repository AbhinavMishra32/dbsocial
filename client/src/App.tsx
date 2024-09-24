import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserProvider } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
export default App