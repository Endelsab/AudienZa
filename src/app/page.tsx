import { getPosts } from "@/actions/postActions";
import { getDbUserId } from "@/actions/userActions";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import SuggestionsToFollow from "@/components/SuggestionsToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
	const user = await currentUser();

	const posts = await getPosts();

	const dbUserId = await getDbUserId();

	return (
		<div className=" grid grid-cols-1 md:grid-cols-10 gap-6 ">
			{/* {div for create post} */}
			<div className="md:col-span-6">
				{user ? <CreatePost /> : null}

				<div className="space-y-6">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} dbUserId={dbUserId} />
					))}
				</div>
			</div>

			{/* {div for right side suggest to follow} */}
			<div className="hidden md:block md:col-span-4 sticky top-20">
				<SuggestionsToFollow />
			</div>
		</div>
	);
}
