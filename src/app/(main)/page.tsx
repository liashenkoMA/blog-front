import HeaderMainPage from "../_components/HeaderMainPage/HeaderMainPage";
import LastArticles from "../_components/LastArticles/LastArticles";

export default async function Page() {
  return (
    <main className="main">
      <HeaderMainPage />
      <LastArticles />
    </main>
  );
}
