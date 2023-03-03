export interface AddCarState {
    registrationNumber: {value: string, valid: boolean};
    brand: {value: string, valid: boolean};
    color: {value: string, valid: boolean};
    year: {value: string, valid: boolean};
}

export enum AddCarActionTypes {
    CHANGE_NUMBER = "CHANGE_NUMBER",
    CHANGE_BRAND = "CHANGE_BRAND",
    CHANGE_COLOR = "CHANGE_COLOR",
    CHANGE_YEAR = "CHANGE_YEAR",
    CHANGE_NUMBER_VALID = "CHANGE_NUMBER_VALID",
    CHANGE_BRAND_VALID = "CHANGE_BRAND_VALID",
    CHANGE_COLOR_VALID = "CHANGE_COLOR_VALID",
    CHANGE_YEAR_VALID = "CHANGE_YEAR_VALID",
    CLEAR_CAR = "CLEAR_CAR",
}

interface ChangeNumberAction {
    type: AddCarActionTypes.CHANGE_NUMBER;
    payload: string;
}

interface ChangeBrandAction {
    type: AddCarActionTypes.CHANGE_BRAND;
    payload: string;
}

interface ChangeColorAction {
    type: AddCarActionTypes.CHANGE_COLOR;
    payload: string;
}

interface ChangeYearAction {
    type: AddCarActionTypes.CHANGE_YEAR;
    payload: string;
}

interface ChangeNumberValidAction {
    type: AddCarActionTypes.CHANGE_NUMBER_VALID;
    payload: boolean;
}

interface ChangeBrandValidAction {
    type: AddCarActionTypes.CHANGE_BRAND_VALID;
    payload: boolean;
}

interface ChangeColorValidAction {
    type: AddCarActionTypes.CHANGE_COLOR_VALID;
    payload: boolean;
}

interface ChangeYearValidAction {
    type: AddCarActionTypes.CHANGE_YEAR_VALID;
    payload: boolean;
}

interface ClearAddCarAction {
    type: AddCarActionTypes.CLEAR_CAR;
}

export type AddCarActions = ChangeNumberAction 
                        | ChangeBrandAction 
                        | ChangeColorAction 
                        | ChangeYearAction 
                        | ChangeNumberValidAction 
                        | ChangeBrandValidAction 
                        | ChangeColorValidAction 
                        | ChangeYearValidAction
                        | ClearAddCarAction;