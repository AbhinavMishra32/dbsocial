import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserProvider } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        {/* <Layout> */}
        {/* <Sidebar> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* </Sidebar> */}
        {/* </Layout> */}
      </BrowserRouter>
    </UserProvider>
  );
};
export default App