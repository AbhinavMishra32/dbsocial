import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { api } from "../services/axios";
import { User } from "../types";

type Post = {
    title: string;
    content: string;
    likes: number;
    id: number;
};

type PostsViewProps = {
    posts: Post[];
    isLoading: boolean;
};

const FetchLikes: React.FC<{ post: Post, isLiked: boolean, user: User }> = ({ post, isLiked, user }) => {
    const [count, setCount] = useState(post.likes);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // console.log("User token: ", user?.token);
        // if (!user?.token) {
        try {
            const decLikes = async () => {
                // const response = await api.post(`/api/posts/like/${post.id}`, {}, {
                //     headers: {
                //         Authorization: `Bearer ${user?.token}`,
                //     },
                // });
                const response = await api.post(
                    "/api/posts/like/" + post.id,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                    }
                  );
                console.log(response.data.postByUser);
                // setCount(response.data.likes);
                setIsLoading(false);
            }
            // incLikes();
            decLikes();
        } catch (error) {
            console.log("Error in likes useEffect: ", error);
            // }
        }
    }, [user?.token, post.id]);

    return (
        <div>
            {
                isLoading ? (
                    <Skeleton className="w-1/2 h-5 rounded-full" />
                ) : (
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>{count}</span>
                    </div >
                )}
        </div>
    );
};
const PostsView: React.FC<PostsViewProps> = ({ posts, isLoading }) => {
    const [isLiked, setIsLiked] = useState(false);
    const {user, setUser} = useUser();

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="flex flex-col space-y-5">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[125px] w-full rounded-xl" />
                ))
            ) : (
                posts.map((post, index) => (
                    <Card key={index} className="flex flex-col space-y-3 rounded-xl">
                        <CardTitle className="p-4">{post.title}</CardTitle>
                        <CardContent>{post.content}</CardContent>
                        <CardFooter onClick={handleLikeClick}>
                            <FetchLikes post={post} isLiked={isLiked}  user={user}/>
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    );
};

export default PostsView;
