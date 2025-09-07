import "./sidebar.scss";

import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { ICategoryPromise } from "@/app/_interface/interface";
import SidebarComponentCategory from "../SidebarComponentCategory/SidebarComponentCategory";
import { getCategories } from "@/app/_utils/articleApi";

export default async function Sidebar() {
  const categories = await getCategories();

  return (
    <aside className="sidebar">
      <SidebarComponent<ICategoryPromise>
        title="Categories"
        sidebarData={categories}
        renderItem={(item) => (
          <SidebarComponentCategory key={item._id} categories={item} />
        )}
      />
    </aside>
  );
}
