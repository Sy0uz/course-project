import { combineReducers } from "redux";
import { addCarReducer } from "./addCarReducer";
import { carsReducer } from "./carsReducer";
import { clientsReducer } from "./clientsReducer";
import { mainReducer } from "./mainReducer";
import { regClientReducer } from "./regClientReducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    clients: clientsReducer,
    regClient: regClientReducer,
    cars: carsReducer,
    addCar: addCarReducer,
})

export type RootState = ReturnType<typeof rootReducer>