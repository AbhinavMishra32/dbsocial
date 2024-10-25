import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import { SidebarProvider } from "./context/SidebarExpandContext";

const App = () => {
  return (
    <UserProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout children={undefined} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Home />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </UserProvider>
  );
};
export default App;
