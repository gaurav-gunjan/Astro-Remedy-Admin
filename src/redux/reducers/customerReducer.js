import * as actionTypes from '../action-types';

const initialState = {
    customerData: [],
    customerByIdData: {},
};

export const customerReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_CUSTOMER:
            return { ...state, customerData: payload }

        case actionTypes.SET_CUSTOMER_BY_ID:
            return { ...state, customerByIdData: payload }

        default:
            return state;
    }
};

export default customerReducer;