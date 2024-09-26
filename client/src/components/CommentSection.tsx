import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { api } from '../services/axios';
import { useUser } from '../context/UserContext';
import { Post } from './PostsView';

type Comment = {
    id: number;
    content: string;
    author: string;
    post: Post;
}

const CommentSection: React.FC<{postId: number, postTitle: string}> = ({postId, postTitle}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fetchComments = async () => {
        const response = await api.get(`/api/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        console.log(
          `Comments of Post Title: ${postTitle}`,
          response.data.comments
        );
        setComments(response.data.comments);
      };
      fetchComments();
    } catch (error) {
      console.log("Error while fetching comments: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full pt-4">
          <h1 className="pb-3">Comments</h1>
          <Input placeholder="Write a comment" className="" />
          <div className="">
            {Array.isArray(comments) ? (
              comments.map((comment: Comment) => (
                <div key={comment.id} className="">
                  <h3>{comment.author}</h3>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CommentSection