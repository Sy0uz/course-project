import { regAction, regClientState, RegClientActionTypes } from "../../types/regClient";

const initialState: regClientState = {
    driverLicenceNumber: {value: '', valid: false},
    fullName: {value: '', valid: false},
    passportData: {value: '', valid: false},
    address: {value: '', valid: false},
}

export const regClientReducer = (state = initialState, action: regAction) => {
    switch (action.type) {
        case RegClientActionTypes.CHANGE_ADDRESS:
            return {...state, address: {...state.address, value: action.payload}}
        case RegClientActionTypes.CHANGE_FULLNAME:
            return {...state, fullName: {...state.fullName, value: action.payload}}
        case RegClientActionTypes.CHANGE_LICENCE:
            return {...state, driverLicenceNumber: {...state.driverLicenceNumber, value: action.payload}}
        case RegClientActionTypes.CHANGE_PASSPORT:
            return {...state, passportData: {...state.passportData, value: action.payload}}
        case RegClientActionTypes.CLEAR_CLIENT:
            return {...state, driverLicenceNumber: {value: '', valid: false}, fullName: {value: '', valid: false}, passportData: {value: '', valid: false}, address: {value: '', valid: false}}
        case RegClientActionTypes.CHANGE_ADDRESS_VALID:
            return {...state, address: {...state.address, valid: action.payload}}
        case RegClientActionTypes.CHANGE_FULLNAME_VALID:
            return { ...state, fullName: { ...state.fullName, valid: action.payload } }
        case RegClientActionTypes.CHANGE_LICENCE_VALID:
            return { ...state, driverLicenceNumber: { ...state.driverLicenceNumber, valid: action.payload } }
        case RegClientActionTypes.CHANGE_PASSPORT_VALID:
            return { ...state, passportData: { ...state.passportData, valid: action.payload } }
        default:
            return state;
    }
}

export const ChangeRegAddressAC = (payload: string):regAction => ({type: RegClientActionTypes.CHANGE_ADDRESS, payload});
export const ChangeRegFullnameAC = (payload: string):regAction => ({type: RegClientActionTypes.CHANGE_FULLNAME, payload});
export const ChangeRegLicenceAC = (payload: string):regAction => ({type: RegClientActionTypes.CHANGE_LICENCE, payload});
export const ChangeRegPassportAC = (payload: string):regAction => ({type: RegClientActionTypes.CHANGE_PASSPORT, payload});

export const ChangeRegAddressValidAC = (payload: boolean):regAction => ({type: RegClientActionTypes.CHANGE_ADDRESS_VALID, payload});
export const ChangeRegFullnameValidAC = (payload: boolean):regAction => ({type: RegClientActionTypes.CHANGE_FULLNAME_VALID, payload});
export const ChangeRegLicenceValidAC = (payload: boolean):regAction => ({type: RegClientActionTypes.CHANGE_LICENCE_VALID, payload});
export const ChangeRegPassportValidAC = (payload: boolean):regAction => ({type: RegClientActionTypes.CHANGE_PASSPORT_VALID, payload});

export const ClearRegClientAC = ():regAction => ({type:RegClientActionTypes.CLEAR_CLIENT});