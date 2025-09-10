import "./tagcard.scss";

import Image from "next/image";
import Link from "next/link";
import { ITagPromise } from "@/app/_interface/interface";

export default function TagCard({ tag }: { tag: ITagPromise }) {
  return (
    <div className="tagcard">
      <Link href={`/${tag.tagSlug}`} className="tagcard__link">
        <Image
          src={tag.tagImage}
          width={40}
          height={40}
          alt={tag.tagImageAlt}
          className="tagcard__image"
        />
        <p className="tagcard__text">{tag.tagName}</p>
      </Link>
    </div>
  );
}
