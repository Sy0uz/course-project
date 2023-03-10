import { BinarySearchTree } from "../structures/clientsTree";
import { IClient } from "./types";

export enum MainActionTypes {
    CREATE_TREE = "CREATE_TREE",
    INSERT_CLIENT = "INSERT_CLIENT",
    FIND_CLIENT = "FIND_CLIENT",
    CLEAR_FINDED_CLIENT = "CLEAR_FINDED_CLIENT",
    DELETE_CLIENT = "DELETE_CLIENT",
    CLEAR_TREE = "CLEAR_TREE",
}

export interface MainState {
    ClientsTree: BinarySearchTree | null;
    addedKeys: string[];
    findedClient: IClient | null;
}

interface CreateTreeAction {
    type: MainActionTypes.CREATE_TREE;
    payload: {
        tree: BinarySearchTree,
        keys: string[],
    },
}

interface InsertClientAction {
    type: MainActionTypes.INSERT_CLIENT;
    payload: IClient;
}

interface FindClientAction {
    type: MainActionTypes.FIND_CLIENT;
    payload: string;
}

interface DeleteClientAction {
    type: MainActionTypes.DELETE_CLIENT;
    payload: string;
}

interface ClearTreeAction {
    type: MainActionTypes.CLEAR_TREE;
}

interface ClearFindedClient {
    type: MainActionTypes.CLEAR_FINDED_CLIENT;
}

export type MainAction = CreateTreeAction 
                        | InsertClientAction 
                        | FindClientAction 
                        | DeleteClientAction 
                        | ClearTreeAction
                        | ClearFindedClient;