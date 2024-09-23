import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {api} from '../services/axios';
import { AxiosError } from 'axios';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log("User not logged in. Redirecting to login page.");
      navigate("/login");
    }
  }, [user, navigate]);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/posts",
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response from server: ", response);
      const updatedPosts = await api.get("/posts");
      setPosts([...posts, ...updatedPosts.data]);
    } catch (err) {
      const er = err as AxiosError;
      setError(er.response?.data.message);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl">Dashboard</h1>
        <p>Welcome {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
      <textarea onChange={(e) => {setNewPost(e.target.value)}} value={newPost}>
      </textarea>
      <Button onClick={handlePostSubmit}>Post</Button>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;