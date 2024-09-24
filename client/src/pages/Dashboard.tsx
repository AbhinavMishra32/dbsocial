import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { api } from '../services/axios';
import PostsView from '../components/PostsView';

const Dashboard = () => {
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log("User not logged in. Redirecting to login page.");
      console.log("User: ", user);
      navigate("/login");
    }
  }, [user, navigate]);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        "/api/posts",
        { content: newPost, title },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response from server: ", response);
      setPosts((prevPosts) => [...prevPosts, response.data.post]);
      setNewPost("");
      setTitle("");
    } catch (err) {
      if (err.response?.status === 403) {
        setUser(null);
      }
      console.error("Error creating post: ", err.response);
      setError("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      const fetchPosts = async () => {
        try {
          const response = await api.get("/api/posts", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
          // console.log("Posts: ", response.data.posts);
          setPosts(response.data.posts);
        } catch (error) {
          if (error.response?.status === 403) {
            setUser(null);
          }
          console.error("Error fetching posts: ", error);
        }
        finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [user, setUser]);

  // const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
  // const refreshTokenValue = refreshToken ? refreshToken.split('=')[1] : null;
  // console.log("Refresh token: ", refreshTokenValue);
  return (
    <>
      <div>
        <h1 className="text-4xl">Dashboard</h1>
        <p>Welcome {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
      <textarea onChange={(e) => { setNewPost(e.target.value) }} value={newPost} placeholder='Enter Post'>
      </textarea>
      <input type="text" onChange={(e) => { setTitle(e.target.value) }} value={title} placeholder='Title' />
      <Button onClick={handlePostSubmit}>Post</Button>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
       <PostsView posts={posts} isLoading={loading} />
    </>
  )
}

export default Dashboard;