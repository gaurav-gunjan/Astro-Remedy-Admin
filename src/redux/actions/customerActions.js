import * as actionTypes from "../action-types";

export const getAllCustomer = payload =>({
    type: actionTypes.GET_ALL_CUSTOMER,
    payload
})

export const setAllCustomer = payload =>({
    type: actionTypes.SET_ALL_CUSTOMER,
    payload
})

export const deleteCustomer = payload =>({
    type: actionTypes.DELETE_CUSTOMER,
    payload
})

export const banCustomer = payload =>({
    type: actionTypes.BAN_CUSTOMER,
    payload
})

export const updateCustomer = payload =>({
    type: actionTypes.UPDATE_CUSTOMER,
    payload
})

export const createCustomer = payload =>({
    type: actionTypes.CREATE_CUSTOMER,
    payload
})