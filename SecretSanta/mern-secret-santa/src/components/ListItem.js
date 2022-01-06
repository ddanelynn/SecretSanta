import React, { useState } from "react";
import Editable from "./Editable";

export const ListItem = (props) => {
  const { itemName, editItem, indx } = props;
  const [itemEdit, setItemEdit] = useState(itemName);

  return (
    <div>
      <Editable text={itemEdit} type="input" defaultEditable={false}>
        <input
          className="wishlist-input"
          type="text"
          name="item"
          onKeyDown={(e) => editItem(e, indx)}
          value={itemEdit}
          onChange={(e) => setItemEdit(e.target.value)}
        />
      </Editable>
      <hr />
    </div>
  );
};
