import React, { useEffect, useState } from "react";
import { api } from "../services/axios";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import PostsView from "../components/PostsView";

const PostPage = () => {
  const { user } = useUser();
  const { postId } = useParams();
  interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
  }
  const [post, setPost] = useState<Post[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);
  useEffect(() => {
    if (!user) return;
    setLoadingPost(true);
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const post = [response.data.post];
        setPost(post);
        console.log("Recived post: ", post);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log("User not logged in");
        } else {
          console.log("Error occured while fetching post: ", error);
        }
      } finally {
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [user]);
  return (
    <>
      {loadingPost ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-10 mr-4">
          <PostsView posts={post} isLoading={loadingPost} />
        </div>
      )}
    </>
  );
};

export default PostPage;
