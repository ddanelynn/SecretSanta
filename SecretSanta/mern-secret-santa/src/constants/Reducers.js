import { combineReducers } from 'redux';
import { userReducer } from '../reducers/UserReducer';
import { itemsReducer } from '../reducers/ItemsReducer'
import { wishlistsReducer } from '../reducers/WishlistsReducer';
import { selectedlistReducer } from '../reducers/SelectedlistReducer';

export const reducers = combineReducers({
    user: userReducer,
    wishlistItems: itemsReducer,
    wishlists: wishlistsReducer,
    selectedList: selectedlistReducer,
  })

export default reducers