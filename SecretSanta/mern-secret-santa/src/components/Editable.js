import React, { useState } from "react";
import "./Profile.css";

const Editable = ({
  text,
  type,
  placeholder,
  children,
  defaultEditable,
  size,
  ...props
}) => {
  const [isEditing, setEditing] = useState(defaultEditable);

  const handleKeyDown = (event, type) => {
    if (event.key === "Enter") {
        setEditing(false);
      }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span className={ size === "large" ? "wishlist-title" : "list-item"}>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;