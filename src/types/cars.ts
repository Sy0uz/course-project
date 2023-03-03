import { HashCars } from "../structures/hashCars";
import { ICar } from "./types";

export enum CarsActionTypes {
    CREATE_HASH = "CREATE_HASH",
    INSERT_CAR = "INSERT_CAR",
    DELETE_CAR = "DELETE_CAR",
    FIND_CAR = "FIND_CAR",
    CLEAR_HASH = "CLEAR_HASH",
    CHANGE_QUERY = "CHANGE_QUERY",
    CLEAR_FINDED = "CLEAR_FINDED"
}

export interface CarsState {
    HashCars: HashCars | null,
    CarsQuery: string,
    addedCars: string[],
    findedCar: ICar | null,
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
    type: CarsActionTypes.CHANGE_QUERY;
    payload: string;
}

export type CarsActions = CreateHashAction 
                        | InsertCarAction 
                        | DeleteCarAction 
                        | FindCarAction 
                        | ClearHashAction 
                        | ChangeCarQueryAction
                        | ClearFindedCarAction;