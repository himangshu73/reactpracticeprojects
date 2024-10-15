import MenuItem from "./menu-item";

export default function MenuList({ listItem = [] }) {
  return (
    <ul className="list-container">
      {listItem && listItem.length
        ? listItem.map((listitem) => <MenuItem item={listitem} />)
        : null}
    </ul>
  );
}
