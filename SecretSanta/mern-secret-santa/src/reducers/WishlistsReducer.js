import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  wishlistsRequest: ['payload'],
  wishlistsClear: null,
})

export const wishlistsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
})

/* ------------- Reducers ------------- */

// successful api lookup
export const request = (state, action) => {
  const { payload } = action
  return state.merge({ payload })
}

export const clear = () => { 
    return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const wishlistsReducer = createReducer(INITIAL_STATE, {
  [Types.WISHLISTS_REQUEST]: request,
  [Types.WISHLISTS_CLEAR]: clear,
})