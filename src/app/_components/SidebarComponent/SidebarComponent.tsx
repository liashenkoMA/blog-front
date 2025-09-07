import "./sidebarComponent.scss";
import { ISidebarComponentProps } from "@/app/_interface/interface";

export default function SidebarComponent<T>({
  title,
  sidebarData,
  renderItem,
}: ISidebarComponentProps<T>) {
  return (
    <section className="sidebar__component">
      <div className="sidebar__component_category">
        <h2 className="sidebar__component_category_title">{title}</h2>
        <ol className="sidebar__component_category_lists">
          {sidebarData.map((item) => renderItem(item))}
        </ol>
      </div>
    </section>
  );
}
