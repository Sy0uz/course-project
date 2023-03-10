import { HashCars } from "../structures/hashCars";
import { ICar } from "./types";

export enum CarsActionTypes {
    CREATE_HASH = "CREATE_HASH",
    INSERT_CAR = "INSERT_CAR",
    DELETE_CAR = "DELETE_CAR",
    FIND_CAR = "FIND_CAR",
    CLEAR_HASH = "CLEAR_HASH",
    CHANGE_CAR_QUERY = "CHANGE_CAR_QUERY",
    CLEAR_FINDED = "CLEAR_FINDED",
    CHANGE_RENT_STATUS = "CHANGE_RENT_STATUS",
    CHANGE_CAR_AVALIABLE = "CHANGE_CAR_AVALIABLE",
}

export interface CarsState {
    HashCars: HashCars | null;
    CarsQuery: string;
    addedCars: string[];
    findedCar: ICar | null;
    isRented: boolean;
}

interface CreateHashAction {
    type: CarsActionTypes.CREATE_HASH;
    payload: {
        hash: HashCars,
        cars: string[],
    }
}

interface InsertCarAction {
    type: CarsActionTypes.INSERT_CAR;
    payload: ICar;
}

interface DeleteCarAction {
    type: CarsActionTypes.DELETE_CAR;
    payload: string;
}

interface FindCarAction {
    type: CarsActionTypes.FIND_CAR;
    payload: string;
}

interface ClearFindedCarAction {
    type: CarsActionTypes.CLEAR_FINDED;
}

interface ClearHashAction {
    type: CarsActionTypes.CLEAR_HASH;
}

interface ChangeCarQueryAction {
    type: CarsActionTypes.CHANGE_CAR_QUERY;
    payload: string;
}

interface ChangeRentStatusAction {
    type: CarsActionTypes.CHANGE_RENT_STATUS;
    payload: boolean;
}

interface ChangeCarAvaliableAction {
    type: CarsActionTypes.CHANGE_CAR_AVALIABLE;
    payload: {
        number: string,
        status: boolean,
    }
}

export type CarsActions = CreateHashAction 
                        | InsertCarAction 
                        | DeleteCarAction 
                        | FindCarAction 
                        | ClearHashAction 
                        | ChangeCarQueryAction
                        | ClearFindedCarAction
                        | ChangeRentStatusAction
                        | ChangeCarAvaliableAction;