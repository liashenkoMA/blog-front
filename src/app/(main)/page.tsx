import HeaderMainPage from "../_components/HeaderMainPage/HeaderMainPage";
import LastArticles from "../_components/LastArticles/LastArticles";
import PopularTags from "../_components/PopularTags/PopularTags";

export default async function Page() {
  return (
    <main className="main">
      <HeaderMainPage />
      <LastArticles />
      <PopularTags />
    </main>
  );
}
