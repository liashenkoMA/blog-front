import "./sidebarComponentCategory.scss";
import { ICategoryResponse } from "@/app/_interface/interface";
import Image from "next/image";
import Link from "next/link";

export default function SidebarComponentCategory({
  categories,
}: {
  categories: ICategoryResponse;
}) {
  return (
    <li className="sidebar__component_category_list">
      <Link
        href={`/${categories.categorySlug}`}
        className="sidebar__component_category_link"
      >
        <Image
          src={categories.categoryImage}
          width={40}
          height={40}
          alt={categories.categoryImageAlt}
          className="sidebar__component_category_image"
        />
        <p className="sidebar__component_category_text">
          {categories.categoryName}
        </p>
      </Link>
    </li>
  );
}
