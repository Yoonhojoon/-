import { combineReducers } from "redux";
import showWindowReducer from "./reducer/showWindowReducer";
import changePageReducer from "./reducer/changePageReducer";
import codeTextReducer from "./reducer/codeTextReducer";
import imageReducer from "./reducer/imgReducer";

const rootReducer = combineReducers({
    showWindow: showWindowReducer,
    changePage: changePageReducer,
    photoData: codeTextReducer,
    image: imageReducer,
})

export default rootReducer;