import BlogClientView from "./BlogClientView";
import { getBlogPosts, getBlogStats } from "@/lib/data/blog";

export const metadata = {
  title: "Medical Blog & Health Tips - Everest International Polyclinic",
  description: "Stay informed with the latest health tips and medical insights from our experts.",
};

export default async function Page() {
  const posts = await getBlogPosts();
  const blogStats = await getBlogStats(posts.length);

  return <BlogClientView posts={posts} blogStats={blogStats} />;
}
