import { LinkedList } from "../structures/linkedList";
import { IRent } from "./types";

export enum RentActionTypes {
    CREATE_LIST = "CREATE_LIST",
    ADD_DATA = "ADD_DATA",
    REMOVE_DATA = "REMOVE_DATA",
    CLEAR_RENT_LIST = "CLEAR_RENT_LIST",
}

export interface RentState {
    LinkedList: LinkedList | null;
}

interface CreateListAction {
    type: RentActionTypes.CREATE_LIST;
    payload: LinkedList;
}

interface AddDataAction {
    type: RentActionTypes.ADD_DATA;
    payload: IRent;
}

interface RemoveDataAction {
    type: RentActionTypes.REMOVE_DATA;
    payload: string;
}

interface ClearRentListAction {
    type: RentActionTypes.CLEAR_RENT_LIST;
}

export type RentAction = CreateListAction
                        | AddDataAction
                        | RemoveDataAction
                        | ClearRentListAction;