export interface ClientsState {
    ClientsQuery: string;
}

export enum ClientsActionTypes {
    CHANGE_QUERY = "CHANGE_QUERY",
}

interface ChangeQueryAction {
    type: ClientsActionTypes.CHANGE_QUERY;
    payload: string;
}

export type ClientsAction = ChangeQueryAction;