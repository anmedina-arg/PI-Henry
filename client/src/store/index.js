import {applyMiddleware, createStore} from "redux";

import reducer from "./reducer";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk)); //el thunk es para que podamos hacer acciones con promesas

export default store;