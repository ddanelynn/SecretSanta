import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.css";
import React, { useState } from "react";
import Editable from "./Editable";

export const ListItem = (props) => {
  const { itemName, editItem, indx, deleteItem } = props;
  const [itemEdit, setItemEdit] = useState(itemName);
  console.log(indx)

  return (
    <div>
      <div style={{ display:"flex", flexDirection: 'row', justifyContent: "space-between" }}>
      <Editable text={itemEdit} type="input" defaultEditable={false}>
        <input
          className="wishlist-input"
          type="text"
          name="item"
          onKeyDown={(e) => editItem(e.target.value, indx)}
          value={itemEdit}
          onChange={(e) => setItemEdit(e.target.value)}
        />
      </Editable>
      <button className="delete-btn" onClick={() => deleteItem()}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      </div>
      <hr />
    </div>
  );
};
