import { combineReducers } from 'redux'
import memories  from "./memories";
import auth from './register';

export const reducers = combineReducers({memories, auth})

