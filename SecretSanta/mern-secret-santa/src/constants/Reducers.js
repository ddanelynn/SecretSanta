import { combineReducers } from 'redux';
import { userReducer } from '../reducers/UserReducer';
import { itemsReducer } from '../reducers/ItemsReducer'
import { wishlistsReducer } from '../reducers/WishlistsReducer';
import { selectedlistReducer } from '../reducers/SelectedlistReducer';
import { eventsReducer } from "../reducers/EventsReducer"
import { selectedeventReducer } from '../reducers/SelectedeventReducer';

export const reducers = combineReducers({
    user: userReducer,
    wishlistItems: itemsReducer,
    wishlists: wishlistsReducer,
    events: eventsReducer,
    selectedList: selectedlistReducer,
    selectedEvent: selectedeventReducer,
  })

export default reducers