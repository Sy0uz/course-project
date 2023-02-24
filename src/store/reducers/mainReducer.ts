import { BinarySearchTree } from "../clientsTree"
import { MainState, MainAction, MainActionTypes } from "../../types/main"
import { IClient } from "../../types/types"

const initialState: MainState = {
    ClientsTree: null,
    findedClient: null,
}

export const mainReducer = (state = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.CREATE_TREE: 
            return {...state, ClientsTree: action.payload}
        case MainActionTypes.INSERT_CLIENT:
            state.ClientsTree?.insert(action.payload);
            state.ClientsTree?.detour();
            return {...state}
        case MainActionTypes.FIND_CLIENT:
            const client = state.ClientsTree ? state.ClientsTree.FindSingle(action.payload) : null;
            return {...state, findedClient: client}
        case MainActionTypes.DELETE_CLIENT:
            state.ClientsTree?.delete(action.payload);
            return {...state, findedClient: null}
        case MainActionTypes.CLEAR_TREE:
            state.ClientsTree?.clearTree();
            return {...state, findedClient: null}
        default:
            return state;
    }
}

export const CreateTreeAC = ():MainAction => {
    const tree = new BinarySearchTree();

    for (const iterator of require('./../clients.json'))
        tree.insert(iterator);

    tree.detour();

    return {type: MainActionTypes.CREATE_TREE, payload: tree};
}

export const InsertClientAC = (payload:IClient):MainAction => ({type:MainActionTypes.INSERT_CLIENT, payload});
export const FindClientAC = (payload: string):MainAction => ({type:MainActionTypes.FIND_CLIENT, payload});
export const DeleteClientAC = (payload: string):MainAction => ({type:MainActionTypes.DELETE_CLIENT, payload})
export const ClearTreeAC = ():MainAction => ({type:MainActionTypes.CLEAR_TREE})
