import { combineReducers } from 'redux';
import { userReducer } from '../reducers/UserReducer';
import { itemsReducer } from '../reducers/ItemsReducer'

export const reducers = combineReducers({
    user: userReducer,
    wishlistItems: itemsReducer
  })

export default reducers