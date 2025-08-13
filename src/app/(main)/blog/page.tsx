import { getArticle } from "@/app/_utils/articleApi";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page() {
  const res = await getArticle("url-test-odin");
  console.log(res);
  return <MDXRemote source={res.article} />;
}
