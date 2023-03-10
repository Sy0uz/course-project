import { HashCars } from "../../structures/hashCars";
import { CarsActions, CarsActionTypes, CarsState } from "../../types/cars";
import { ICar } from "../../types/types";

const initialState: CarsState = {
    HashCars: null,
    CarsQuery: '',
    addedCars: [],
    findedCar: null,
    isRented: false,
}

export const carsReducer = (state = initialState, action: CarsActions): CarsState => {
    switch (action.type) {
        case CarsActionTypes.CREATE_HASH:
            return {...state, HashCars: action.payload.hash, addedCars: action.payload.cars}
        case CarsActionTypes.CLEAR_HASH:
            state.HashCars?.ClearHash()
            return {...state, findedCar: null, addedCars: []};
        case CarsActionTypes.INSERT_CAR:
            state.HashCars?.Insert(action.payload.registrationNumber, action.payload);
            return {...state, addedCars: [...state.addedCars, action.payload.registrationNumber]};
        case CarsActionTypes.DELETE_CAR:
            state.HashCars?.Remove(action.payload);
            return {...state, addedCars: state.addedCars.filter((i) => i !== action.payload)};
        case CarsActionTypes.FIND_CAR:
            const car = state.HashCars?.Find(action.payload) ? state.HashCars?.Find(action.payload) : null;
            return {...state, findedCar: car};
        case CarsActionTypes.CHANGE_CAR_QUERY:
            return {...state, CarsQuery: action.payload}
        case CarsActionTypes.CLEAR_FINDED:
            return {...state, findedCar: null};
        case CarsActionTypes.CHANGE_RENT_STATUS:
            return {...state, isRented: action.payload}
        case CarsActionTypes.CHANGE_CAR_AVALIABLE:
            let finded = state.HashCars?.FindSegment(action.payload.number);
            if (finded?.Value)
                finded.Value.isAvailable = action.payload.status;
            return {...state};
        default:
            return state;
    }
}

export const CreateHashAC = () => {
    const hash = new HashCars();
    const cars:string[] = [];

    const data:ICar[] = require('./../cars.json')

    for (const iterator of data) {
        hash.Insert(iterator.registrationNumber, iterator)
        cars.push(iterator.registrationNumber);
    }

    return {type: CarsActionTypes.CREATE_HASH, payload: {hash: hash, cars: cars}};
}

export const ClearHashAC = () => ({type:CarsActionTypes.CLEAR_HASH})
export const InsertCarAC = (payload:ICar) => ({type:CarsActionTypes.INSERT_CAR, payload})
export const FindCarAC = (payload:string) => ({type:CarsActionTypes.FIND_CAR, payload})
export const DeleteCarAC = (payload:string) => ({type:CarsActionTypes.DELETE_CAR, payload})
export const ChangeCarQueryAC = (payload:string) => ({type:CarsActionTypes.CHANGE_CAR_QUERY, payload})
export const ClearFindedCarAC = () => ({type:CarsActionTypes.CLEAR_FINDED})
export const ChangeRentStatusAC = (payload: boolean) => ({type:CarsActionTypes.CHANGE_RENT_STATUS, payload})
export const ChangeCarAvaliableAC = (number:string, status:boolean) => ({type:CarsActionTypes.CHANGE_CAR_AVALIABLE, payload: {number, status}})