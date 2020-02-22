// import { spy } from "mobx";   
import common from './common';
import user from './user';
import game from './game';
import local from './local';

let store = {
  user,
  common,
  game,
  local,
}

export default store;
