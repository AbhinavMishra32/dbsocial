import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { api } from '../services/axios';
import { useUser } from '../context/UserContext';
import { Post } from './PostsView';
import { Button } from './ui/button';
import { User } from '../types';

type Comment = {
  id: number;
  content: string;
  author: string;
  post: Post;
}

const CommentSection: React.FC<{ postId: number, postTitle: string }> = ({ postId, postTitle }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isLoadingCommentSubmit, setIsLoadingCommentSubmit] = useState(false);

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
  }, [isLoadingCommentSubmit]);

  const handleCommentSubmit = async () => {
    if (isLoadingCommentSubmit) return;
    try {
      setIsLoadingCommentSubmit(true);
      const response = await api.post(`/api/posts/${postId}/comments`, {
        content: commentInput,
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
      });
      console.log(`Response from submitted comment ${commentInput}: `, response.data);
    } catch (error) {
      console.log("Error while submitting comment: ", error);
    } finally {
      setIsLoadingCommentSubmit(false);
    }
  }


  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full pt-4">
          <h1 className="pb-3 font-bold">Comments ({comments.length})</h1>
          <div className="flex items-center">
            <Input placeholder="Write a comment" className="flex-grow" onChange={(e) => { setCommentInput(e.target.value) }} value={commentInput} />
            <Button className="ml-2" variant={'outline'} onClick={handleCommentSubmit}>Comment</Button>
          </div>
          <div className="">
            {Array.isArray(comments) ? (
              comments.map((comment) => (
                <div key={comment.id} className="">
                  <h3>{comment.author.name}</h3>
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