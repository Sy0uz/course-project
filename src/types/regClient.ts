export interface regClientState {
    driverLicenceNumber: {value: string, valid: boolean}
    fullName: {value: string, valid: boolean}
    passportData: {value: string, valid: boolean}
    address: {value: string, valid: boolean}
}

export enum RegClientActionTypes {
    CHANGE_LICENCE = "CHANGE_LICENCE",
    CHANGE_FULLNAME = "CHANGE_FULLNAME",
    CHANGE_PASSPORT = "CHANGE_PASSPORT",
    CHANGE_ADDRESS = "CHANGE_ADDRESS",
    CHANGE_LICENCE_VALID = "CHANGE_LICENCE_VALID",
    CHANGE_FULLNAME_VALID = "CHANGE_FULLNAME_VALID",
    CHANGE_PASSPORT_VALID = "CHANGE_PASSPORT_VALID",
    CHANGE_ADDRESS_VALID = "CHANGE_ADDRESS_VALID",
    CLEAR_CLIENT = "CLEAR_CLIENT",
}

interface ChangeLicenceAction {
    type: RegClientActionTypes.CHANGE_LICENCE,
    payload: string,
}

interface ChangeFullnameAction {
    type: RegClientActionTypes.CHANGE_FULLNAME,
    payload: string,
}

interface ChangePassportAction {
    type: RegClientActionTypes.CHANGE_PASSPORT,
    payload: string,
}

interface ChangeAddressAction {
    type: RegClientActionTypes.CHANGE_ADDRESS,
    payload: string,
}

interface ChangeLicenceValidAction {
    type: RegClientActionTypes.CHANGE_LICENCE_VALID,
    payload: boolean,
}

interface ChangeFullnameValidAction {
    type: RegClientActionTypes.CHANGE_FULLNAME_VALID,
    payload: boolean,
}

interface ChangePassportValidAction {
    type: RegClientActionTypes.CHANGE_PASSPORT_VALID,
    payload: boolean,
}

interface ChangeAddressValidAction {
    type: RegClientActionTypes.CHANGE_ADDRESS_VALID,
    payload: boolean,
}

interface ClearClientAction {
    type: RegClientActionTypes.CLEAR_CLIENT,
}

export type regAction = ChangeAddressAction | ChangeFullnameAction | ChangePassportAction | ChangeLicenceAction | ClearClientAction | ChangeLicenceValidAction | ChangeFullnameValidAction | ChangePassportValidAction | ChangeAddressValidAction;