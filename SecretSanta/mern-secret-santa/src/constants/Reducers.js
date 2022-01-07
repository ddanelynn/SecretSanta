import { combineReducers } from 'redux';
import { userReducer } from '../reducers/UserReducer';
import { itemsReducer } from '../reducers/ItemsReducer'
import { wishlistsReducer } from '../reducers/WishlistsReducer';
import { selectedlistReducer } from '../reducers/SelectedlistReducer';
import { eventsReducer } from "../reducers/EventsReducer"

export const reducers = combineReducers({
    user: userReducer,
    wishlistItems: itemsReducer,
    wishlists: wishlistsReducer,
    selectedList: selectedlistReducer,
    events: eventsReducer,
  })

export default reducers