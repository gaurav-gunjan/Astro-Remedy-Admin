import * as actionTypes from "../actionTypes";

const initialState = {
    astroPujaPujaData: [],
    astroPujaRequestData: [],
    astroPujaAcceptedData: [],
    astroPujaRejectedData: [],
    astroPujaBookedData: [],
};

const astropujaReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ASTRO_PUJA_PUJA: {
            return {
                ...state,
                astroPujaPujaData: payload,
            };
        }
        case actionTypes.SET_ASTRO_PUJA_REQUEST: {
            return {
                ...state,
                astroPujaRequestData: payload,
            };
        }
        case actionTypes.SET_ASTRO_PUJA_ACCEPTED: {
            return {
                ...state,
                astroPujaAcceptedData: payload,
            };
        }
        case actionTypes.SET_ASTRO_PUJA_REJECTED: {
            return {
                ...state,
                astroPujaRejectedData: payload,
            };
        }
        case actionTypes.SET_ASTRO_PUJA_BOOKED: {
            return {
                ...state,
                astroPujaBookedData: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default astropujaReducer;
