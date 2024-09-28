import * as actionTypes from "../action-types";

const initialState = {
    pujaData: [],
};

const astropujaReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_PUJA: {
            return {
                pujaData: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default astropujaReducer;