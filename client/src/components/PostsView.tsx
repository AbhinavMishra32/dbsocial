import { Heart, UserSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { api } from "../services/axios";
import { User } from "../types";
import CommentSection from "./CommentSection";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { set } from "react-hook-form";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export type Post = {
  title: string;
  content: string;
  likes: number;
  id: number;
  author: User;
};

type PostsViewProps = {
  posts: Post[];
  isLoading: boolean;
};

const FetchLikes: React.FC<{ post: Post; user: User }> = ({ post, user }) => {
  const [count, setCount] = useState(post.likes);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  // make liked state inside fetchlikes, and the button also put inside that component, make it handle everything

  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const response = await api.get("/api/posts/like/isliked/" + post.id, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        // console.log("isLiked response: ", response);
        setIsLiked(response.data.isLiked);
        setIsLoading(false);
      } catch (error) {
        console.log("Post id: ", post.id);
        console.log("Error in fetching isliked useEffect: ", error);
      }
    };
    fetchIsLiked();
  }, [post.id, user?.token]);

  const HandlelikeClick = async () => {
    if (isLoadingLike) return;

    setIsLoadingLike(true);
    try {
      setCount(isLiked ? count - 1 : count + 1);
      setIsLiked(!isLiked);
      const response = await api.post(
        "/api/posts/like/" + post.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("like response: ", response);
      // setIsLiked(response.data.isLiked);
      // setCount(response.data.updatedPost.likes);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in likes useEffect: ", error);
    } finally {
      setIsLoadingLike(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="w-1/2 h-5 rounded-full" />
      ) : (
        <div className="flex items-center space-x-2">
          <button onClick={HandlelikeClick}>
            <div
              className={`flex justify-center items-center size-10 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:rounded-full active:size-11 transition-all ease-in-out`}
            >
              <Heart className="w-5 h-5" fill={isLiked ? "red" : "black"} />
            </div>
          </button>
          <span>{count}</span>
        </div>
      )}
    </div>
  );
};
const PostsView = ({ posts, isLoading }) => {
  const { user } = useUser();
  const location = useLocation();
  const isOnPostPage = location.pathname.includes("/post/");

  if (posts.length === 0) {
    if (isLoading) {
      return (
        <div className="flex flex-col space-y-5 animate-pulse">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[225px] w-full rounded-xl bg-neutral-800"
            />
          ))}
        </div>
      );
    }
    return <p className="text-xl text-neutral-300">No posts found.</p>;
  }

  return (
    <div className="flex flex-col space-y-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[125px] w-full rounded-xl bg-neutral-800 animate-pulse"
            />
          ))
        : posts.map((post, index) => (
            <Card
              key={index}
              className="flex flex-col space-y-3 rounded-xl bg-neutral-900 border-neutral-700 hover:border-neutral-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                {isOnPostPage ? (
                  <FullPostView post={post} user={user} />
                ) : (
                  <PostPreview post={post} user={user} />
                )}
              </div>
            </Card>
          ))}
    </div>
  );
};

const FullPostView = ({ post, user }) => (
  <>
    <CardTitle className="p-5 flex flex-col gap-4 bg-neutral-900">
      <AuthorInfo post={post} />
      <h2 className="text-2xl font-bold text-neutral-100">{post.title}</h2>
    </CardTitle>
    <CardContent className="p-5 text-neutral-300">{post.content}</CardContent>
    <CardFooter className="flex flex-col items-start gap-3 p-5 bg-neutral-900">
      <FetchLikes post={post} user={user} />
      <CommentSection postId={post.id} postTitle={post.title} />
    </CardFooter>
  </>
);

const PostPreview = ({ post, user }) => (
  <div className="hover:bg-neutral-800 transition-colors duration-300 overflow-hidden">
    <Link to={`/post/${post.id}`} className="block">
      <CardTitle className="p-4 flex flex-col gap-4">
        <AuthorInfo post={post} />
        <h2 className="text-xl font-semibold text-neutral-100 break-all">
          {post.title}
        </h2>
      </CardTitle>
      <CardContent className="p-4 text-neutral-300 line-clamp-3">
        {post.content}
      </CardContent>
    </Link>
    <CardFooter className="flex flex-wrap items-center justify-between p-4 bg-neutral-800">
      <FetchLikes post={post} user={user} />
      <Link to={`/post/${post.id}`} className="text-sm text-neutral-400">
        Read more →
      </Link>
    </CardFooter>
  </div>
);

const AuthorInfo = ({ post }) => (
  <HoverCard>
    <HoverCardTrigger>
      <div className="flex items-center gap-2 w-auto group">
        <Avatar className="size-8 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              post.author.name
            )}&background=random`}
            alt={post.author.name}
          />
        </Avatar>
        <p className="flex justify-center items-center text-base text-neutral-300 group-hover:text-blue-400 transition-colors duration-300">
          {post.author.name}
        </p>
      </div>
    </HoverCardTrigger>
    <HoverCardContent
      align="start"
      side="bottom"
      className="bg-neutral-800 border-neutral-700"
    >
      <div className="flex w-auto gap-3">
        <Avatar className="size-12">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              post.author.name
            )}&background=random`}
            alt={post.author.name}
          />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-neutral-100">
            {post.author.name}
          </p>
          <p className="text-sm text-neutral-400">{post.author.email}</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default PostsView;
