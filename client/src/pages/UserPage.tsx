import React, { useEffect, useMemo, useState } from 'react'
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { api } from '../services/axios';
import ProfileCard from '../components/ProfileCard';
import PostsView from '../components/PostsView';

const UserPage = () => {
  const { user } = useUser();
  const { username: linkUsername } = useParams();
  const [posts, setPosts] = useState([]);
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const localUser = useMemo(() => {
    return user && user.username === linkUsername;
  }, [user, linkUsername]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${linkUsername}`);
        setFetchedUser(response.data.user);
        // console.log("USER FETCHED: ", response.data.user);
        console.log(response);
      } catch (error) {
        console.log("Error occured while fetching: ", error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!fetchedUser) return;
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          params: {
            username: fetchedUser.name,
          },
        });
        console.log("posts recieved: ", response.data.posts);
        setPosts(response.data.posts);
        console.log("Posts: ", posts);
      } catch (error) {
        console.log("Error occured while fetching posts: ", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [fetchedUser, user]);

  return (
    <div>
      {isLoadingUser ? (
        <p>Loading user information...</p>
      ) : (
        <>
          {fetchedUser ? (
            <>
              <ProfileCard
                username={fetchedUser.name}
                email={fetchedUser.email}
              />
              <PostsView posts={posts} isLoading={isLoadingPosts} />
            </>
          ) : (
            <p>User not found</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserPage