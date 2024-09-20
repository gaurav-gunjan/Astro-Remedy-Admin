import * as actionTypes from '../action-types';

export const getCustomer = payload => ({
    type: actionTypes?.GET_CUSTOMER,
    payload
});

export const setCustomer = payload => ({
    type: actionTypes?.SET_CUSTOMER,
    payload
});

export const getCustomerById = payload => ({
    type: actionTypes?.GET_CUSTOMER_BY_ID,
    payload
});

export const setCustomerById = payload => ({
    type: actionTypes?.SET_CUSTOMER_BY_ID,
    payload
});

export const createCustomer = payload => ({
    type: actionTypes?.CREATE_CUSTOMER,
    payload
});

export const updateCustomerById = payload => ({
    type: actionTypes?.UPDATE_CUSTOMER_BY_ID,
    payload
});

export const deleteCustomerById = payload => ({
    type: actionTypes?.DELETE_CUSTOMER_BY_ID,
    payload
});

export const changeCustomerBannedUnbannedStatus = payload => ({
    type: actionTypes?.CHANGE_CUSTOMER_BANNED_UNBANNED_STATUS,
    payload
});