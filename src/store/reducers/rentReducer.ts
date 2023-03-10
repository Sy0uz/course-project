import { LinkedList } from "../../structures/linkedList";
import { RentAction, RentActionTypes, RentState } from "../../types/rent";
import { IRent } from "../../types/types";

const initialState:RentState = {
    LinkedList: null,
}

export const rentReducer = (state = initialState, action:RentAction):RentState => {
    switch (action.type) {
        case RentActionTypes.CREATE_LIST:
            return {...state, LinkedList: action.payload};
        case RentActionTypes.ADD_DATA:
            state.LinkedList?.Add(action.payload);
            return {...state};
        case RentActionTypes.REMOVE_DATA:
            state.LinkedList?.Remove(action.payload);
            return {...state};
        case RentActionTypes.CLEAR_RENT_LIST:
            state.LinkedList?.ClearList();
            return {...state};
        default:
            return state;
    }
}

export const CreateListAC = (): RentAction => {
    let List = new LinkedList();
    return { type: RentActionTypes.CREATE_LIST, payload: List };
}

export const AddRentDataAC = (payload: IRent): RentAction => ({ type: RentActionTypes.ADD_DATA, payload });
export const RemoveRentDataAC = (payload: string): RentAction => ({ type: RentActionTypes.REMOVE_DATA, payload });
export const ClearRentListAC = (): RentAction => ({type: RentActionTypes.CLEAR_RENT_LIST});