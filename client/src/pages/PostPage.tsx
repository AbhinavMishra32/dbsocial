import React, { useEffect } from 'react'
import { api } from '../services/axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PostPage = () => {
    const { user } = useUser();
    const { postId } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
            } catch (error) {

            }
        }
    });
    return (
        <div>
            {/* Make a component of a post that can be used in different locations like in the post page */}
        </div>
    )
}

export default PostPage