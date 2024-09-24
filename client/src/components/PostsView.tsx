import { Card, CardContent, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type Post = {
    title: string;
    content: string;
};

type PostsViewProps = {
    posts: Post[];
    isLoading: boolean;
};

const PostsView: React.FC<PostsViewProps> = ({ posts, isLoading }) => {
    return (
        <>
            {isLoading ? (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                </div>
            ) : (
                posts.map((post, index) => (
                    <Card key={index} className="flex flex-col space-y-3">
                        <CardTitle>{post.title}</CardTitle>
                        <CardContent>{post.content}</CardContent>
                    </Card>
                ))
            )}
        </>
    );
};

export default PostsView;
