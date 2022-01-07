import React, { useState } from "react";
import "./Profile.css";

const Editable = ({
  text,
  type,
  placeholder,
  children,
  defaultEditable,
  size,
  color,
  ...props
}) => {
  const [isEditing, setEditing] = useState(defaultEditable);

  const handleKeyDown = (event, type) => {
    if (event.key === "Enter" && text.length > 0) {
        setEditing(false);
      }
  };

  const handlePress = () => {
    if(text.length > 0) {
      setEditing(false)
    }
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => handlePress()}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span className={ color === "white" ? "view-wishlist-title" : size === "large" ? "wishlist-title" : "list-item"}>
            {text || placeholder || ""}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;