import * as actionTypes from "../action-types";

export const getPuja = payload => {
    return {
        type: actionTypes.GET_PUJA,
        payload
    }
}

export const setPuja = payload => {
    return {
        type: actionTypes.SET_PUJA,
        payload
    }
}

export const createPuja = payload => {
    return {
        type: actionTypes.CREATE_PUJA,
        payload
    }
}

export const updatePuja = payload => {
    return {
        type: actionTypes.UPDATE_PUJA,
        payload
    }
}

export const deletePuja = payload => {
    return {
        type: actionTypes.DELETE_PUJA,
        payload
    }
}