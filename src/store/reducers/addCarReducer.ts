import { AddCarActions, AddCarActionTypes, AddCarState } from "../../types/addCar";

const initialState: AddCarState = {
    registrationNumber: {value: '', valid: false},
    brand: {value: '', valid: false},
    color: {value: '', valid: false},
    year: {value: '', valid: false},
}

export const addCarReducer = (state = initialState, action:AddCarActions):AddCarState => {
    switch (action.type) {
        case AddCarActionTypes.CHANGE_NUMBER:
            return { ...state, registrationNumber: { ...state.registrationNumber, value: action.payload } }
        case AddCarActionTypes.CHANGE_BRAND:
            return { ...state, brand: { ...state.brand, value: action.payload } }
        case AddCarActionTypes.CHANGE_COLOR:
            return { ...state, color: { ...state.color, value: action.payload } }
        case AddCarActionTypes.CHANGE_YEAR:
            return { ...state, year: { ...state.year, value: action.payload } }
        case AddCarActionTypes.CHANGE_NUMBER_VALID:
            return { ...state, registrationNumber: { ...state.registrationNumber, valid: action.payload } }
        case AddCarActionTypes.CHANGE_BRAND_VALID:
            return { ...state, brand: { ...state.brand, valid: action.payload } }
        case AddCarActionTypes.CHANGE_COLOR_VALID:
            return { ...state, color: { ...state.color, valid: action.payload } }
        case AddCarActionTypes.CHANGE_YEAR_VALID:
            return { ...state, year: { ...state.year, valid: action.payload } }
        case AddCarActionTypes.CLEAR_CAR:
            return {
                registrationNumber: { value: '', valid: false },
                brand: { value: '', valid: false },
                color: { value: '', valid: false },
                year: { value: '', valid: false },
            }
        default:
            return state;
    }
}

export const ChangeAddNumberAC = (payload: string): AddCarActions => ({ type: AddCarActionTypes.CHANGE_NUMBER, payload });
export const ChangeAddBrandAC = (payload: string): AddCarActions => ({ type: AddCarActionTypes.CHANGE_BRAND, payload });
export const ChangeAddColorAC = (payload: string): AddCarActions => ({ type: AddCarActionTypes.CHANGE_COLOR, payload });
export const ChangeAddYearAC = (payload: string): AddCarActions => ({ type: AddCarActionTypes.CHANGE_YEAR, payload });

export const ChangeAddNumberValidAC = (payload: boolean): AddCarActions => ({ type: AddCarActionTypes.CHANGE_NUMBER_VALID, payload });
export const ChangeAddBrandValidAC = (payload: boolean): AddCarActions => ({ type: AddCarActionTypes.CHANGE_BRAND_VALID, payload });
export const ChangeAddColorValidAC = (payload: boolean): AddCarActions => ({ type: AddCarActionTypes.CHANGE_COLOR_VALID, payload });
export const ChangeAddYearValidAC = (payload: boolean): AddCarActions => ({ type: AddCarActionTypes.CHANGE_YEAR_VALID, payload });

export const ClearAddCarAC = (): AddCarActions => ({ type: AddCarActionTypes.CLEAR_CAR });