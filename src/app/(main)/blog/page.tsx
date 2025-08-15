export default async function Page({
  params,
}: {
  params: { category: string; article: string };
}) {

  console.log(params)


  return (
    <div>
      <h2>blog</h2>
    </div>
  );
}
