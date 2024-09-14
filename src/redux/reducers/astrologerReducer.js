import * as actionTypes from '../action-types';

const initialState = {
    astrologerData: [],
    enquiryAstrologerData: [],
    astrologerByIdData: {},
    chatHistoryByAstrologerIdData: [],
    callHistoryByAstrologerIdData: [],
    liveHistoryByAstrologerIdData: [],
    giftHistoryByAstrologerIdData: [],
    reviewByAstrologerIdData: [],
    transactionByAstrologerIdData: [],
};

export const astrologerReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_ASTROLOGER:
            return { ...state, astrologerData: payload }

        case actionTypes.SET_ENQUIRY_ASTROLOGER:
            return { ...state, enquiryAstrologerData: payload }

        case actionTypes.SET_ASTROLOGER_BY_ID:
            return { ...state, astrologerByIdData: payload }

        case actionTypes.SET_CHAT_HISTORY_BY_ASTROLOGER_ID:
            return { ...state, chatHistoryByAstrologerIdData: payload }

        case actionTypes.SET_CALL_HISTORY_BY_ASTROLOGER_ID:
            return { ...state, callHistoryByAstrologerIdData: payload }

        case actionTypes.SET_LIVE_HISTORY_BY_ASTROLOGER_ID:
            return { ...state, liveHistoryByAstrologerIdData: payload }

        case actionTypes.SET_GIFT_HISTORY_BY_ASTROLOGER_ID:
            return { ...state, giftHistoryByAstrologerIdData: payload }

        case actionTypes.SET_REVIEW_BY_ASTROLOGER_ID:
            return { ...state, reviewByAstrologerIdData: payload }

        case actionTypes.SET_TRANSACTION_BY_ASTROLOGER_ID:
            return { ...state, transactionByAstrologerIdData: payload }

        default:
            return state;
    }
};

export default astrologerReducer;