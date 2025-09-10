import "./populartags.scss";

import { getTags } from "@/app/_utils/articleApi";
import TagCard from "../TagCard/TagCard";

export default async function Page() {
  const tags = await getTags();

  return (
    <section className="populartags">
      <div className="populartags__info">
        <h2 className="populartags__title">Популярные тэги</h2>
        <p className="populartags__text">Популярные тэги моего блога!</p>
      </div>
      <div className="populartags__content">
        {tags.slice(0, 12).map((tag) => (
          <TagCard key={tag._id} tag={tag} />
        ))}
      </div>
    </section>
  );
}
