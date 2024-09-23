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
  const [loading, setLoading] = useState(true);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/posts",
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response from server: ", response);
      const updatedPosts = await api.get("/api/posts");
      setPosts([...posts, ...updatedPosts.data]);
      // setLoading(false);
    } catch (err) {
      const er = err as AxiosError;
      setError(er.response?.data.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/posts', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          }
        });
        console.log("Posts: ", response.data.posts);
        setPosts(response.data.posts);
      }
      catch (error) {
        console.error("Error fetching posts: ", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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