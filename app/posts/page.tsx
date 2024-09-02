import Layout from "../../components/layout/layout";
import client from "../../tina/__generated__/client";
import PostsClientPage from "./client-page";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const tag = searchParams.tag;
  const filter = tag ? { tags: { eq: tag } } : undefined;
  const posts = await client.queries.postConnection({
    filter,
  });
  const theme = await client.queries.themeConnection();
  const allTags = theme?.data?.themeConnection?.edges.map((edge) => edge.node.data).flat();
  console.log(JSON.stringify(allTags, null, 2));
  if (!posts) {
    return null;
  }

  return (
    <Layout rawPageData={posts.data}>
      <PostsClientPage {...posts} />
    </Layout>
  );
}
