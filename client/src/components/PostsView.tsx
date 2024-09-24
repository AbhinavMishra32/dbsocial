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
        <div className="flex flex-col space-y-5">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[125px] w-[250px] rounded-xl" />
                ))
            ) : (
                posts.map((post, index) => (
                    <Card key={index} className="flex flex-col space-y-3 rounded-xl">
                        <CardTitle className="p-4">{post.title}</CardTitle>
                        <CardContent>{post.content}</CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default PostsView;
