import "./styles.css";
import menus from "./data";
import MenuList from "./menu-list";

export default function TreeView({ menus = [] }) {
  return (
    <div className="container">
      <MenuList listItem={menus} />
    </div>
  );
}
