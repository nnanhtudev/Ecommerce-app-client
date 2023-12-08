import { createStore } from "redux";
import ReducerRoot from "./Redux/Reducer/ReducerRoot";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(ReducerRoot, composeWithDevTools());

export default store;
