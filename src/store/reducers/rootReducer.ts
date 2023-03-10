import { combineReducers } from "redux";
import { addCarReducer } from "./addCarReducer";
import { carsReducer } from "./carsReducer";
import { clientsReducer } from "./clientsReducer";
import { mainReducer } from "./mainReducer";
import { regClientReducer } from "./regClientReducer";
import { rentReducer } from "./rentReducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    clients: clientsReducer,
    regClient: regClientReducer,
    cars: carsReducer,
    addCar: addCarReducer,
    rent: rentReducer,
})

export type RootState = ReturnType<typeof rootReducer>