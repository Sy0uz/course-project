import { combineReducers } from "redux";
import { clientsReducer } from "./clientsReducer";
import { mainReducer } from "./mainReducer";
import { regClientReducer } from "./regClientReducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    clients: clientsReducer,
    regClient: regClientReducer,
})

export type RootState = ReturnType<typeof rootReducer>