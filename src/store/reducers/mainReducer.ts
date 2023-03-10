import { BinarySearchTree } from "../../structures/clientsTree"
import { MainState, MainAction, MainActionTypes } from "../../types/main"
import { IClient } from "../../types/types"

const initialState: MainState = {
    ClientsTree: null,
    addedKeys: [],
    findedClient: null,
}

export const mainReducer = (state = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.CREATE_TREE: 
            return {...state, ClientsTree: action.payload.tree, addedKeys: action.payload.keys};
        case MainActionTypes.INSERT_CLIENT:
            state.ClientsTree?.insert(action.payload);
            state.ClientsTree?.detour();
            return {...state, addedKeys: [...state.addedKeys, action.payload.driverLicenceNumber]};
        case MainActionTypes.FIND_CLIENT:
            const client = state.ClientsTree ? state.ClientsTree.FindSingle(action.payload) : null;
            return {...state, findedClient: client};
        case MainActionTypes.DELETE_CLIENT:
            state.ClientsTree?.delete(action.payload);
            return {...state, findedClient: null, addedKeys: state.addedKeys.filter((i) => i !== action.payload)};
        case MainActionTypes.CLEAR_TREE:
            state.ClientsTree?.clearTree();
            return {...state, findedClient: null, addedKeys: []};
        case MainActionTypes.CLEAR_FINDED_CLIENT:
            return {...state, findedClient: null};
        default:
            return state;
    }
}

export const CreateTreeAC = ():MainAction => {
    const data:IClient[] = require('./../clients.json');
    const tree = new BinarySearchTree();
    const keys = [];

    for (const iterator of data) {
        tree.insert(iterator);
        keys.push(iterator.driverLicenceNumber)
    }
    tree.detour();

    return {type: MainActionTypes.CREATE_TREE, payload: {tree: tree, keys: keys}};
}

export const InsertClientAC = (payload:IClient):MainAction => ({type:MainActionTypes.INSERT_CLIENT, payload});
export const FindClientAC = (payload: string):MainAction => ({type:MainActionTypes.FIND_CLIENT, payload});
export const DeleteClientAC = (payload: string):MainAction => ({type:MainActionTypes.DELETE_CLIENT, payload})
export const ClearFindedClientAC = ():MainAction => ({type:MainActionTypes.CLEAR_FINDED_CLIENT})
export const ClearTreeAC = ():MainAction => ({type:MainActionTypes.CLEAR_TREE})
