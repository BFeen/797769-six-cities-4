import {combineReducers} from "redux";
import {reducer as application} from "./application/application.js";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.APPLICATION]: application,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
