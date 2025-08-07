import dynamic from "next/dynamic";
import { useState } from "react";

const EditorComp = dynamic(
  () => import("@/app/_components/MDXEditor/MdxEditor"),
  { ssr: false }
);

export default function ArticleDownloadForm() {
  const markdown = `
Hello **world**!
`;
  const [article, setArticle] = useState("");

  async function handleSubmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(article);
  }

  return (
    <form onSubmit={handleSubmin}>
      <EditorComp
        markdown={markdown}
        onChange={(value: string) => setArticle(value)}
      />
      ;<button type="submit">Опубликовать статью</button>
    </form>
  );
}
