import { useState } from "react";
import MenuList from "./menu-list";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  const handleToggle = (getCurrentLabel) => {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel],
    });
  };

  return (
    <li>
      <div className="menu-item">
        <p>{item.label}</p>
        {item.children && item.children.length ? (
          <span onClick={() => handleToggle(item.label)}>
            {displayCurrentChildren[item.label] ? <FaMinus /> : <FaPlus />}
          </span>
        ) : null}
      </div>
      {item.children &&
      item.children.length &&
      displayCurrentChildren[item.label] ? (
        <MenuList listItem={item.children} />
      ) : null}
    </li>
  );
}
