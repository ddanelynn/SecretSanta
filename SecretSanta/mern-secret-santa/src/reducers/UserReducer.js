import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['payload'],
  userClear: null,
})

export const userTypes = Types
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

export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_CLEAR]: clear,
})