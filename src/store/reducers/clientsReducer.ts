import { ClientsAction, ClientsActionTypes, ClientsState } from "../../types/clients";

const initialState: ClientsState = {
    ClientsQuery: '',
}

export const clientsReducer = (state = initialState, action:ClientsAction): ClientsState => {
    switch (action.type) {
        case ClientsActionTypes.CHANGE_QUERY:
            return {...state, ClientsQuery: action.payload};
        default:
            return state;
    }
}

export const ChangeQueryAC = (payload: string):ClientsAction => ({type: ClientsActionTypes.CHANGE_QUERY, payload})