import * as actionTypes from '../action-types';

export const getAstrologer = payload => ({
    type: actionTypes?.GET_ASTROLOGER,
    payload
});

export const setAstrologer = payload => ({
    type: actionTypes?.SET_ASTROLOGER,
    payload
});

export const getAstrologerById = payload => ({
    type: actionTypes?.GET_ASTROLOGER_BY_ID,
    payload
});

export const setAstrologerById = payload => ({
    type: actionTypes?.SET_ASTROLOGER_BY_ID,
    payload
});

export const createAstrologer = payload => ({
    type: actionTypes?.CREATE_ASTROLOGER,
    payload
});

export const updateAstrologerById = payload => ({
    type: actionTypes?.UPDATE_ASTROLOGER_BY_ID,
    payload
});

export const deleteAstrologerById = payload => ({
    type: actionTypes?.DELETE_ASTROLOGER_BY_ID,
    payload
});

export const getChatHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_CHAT_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const setChatHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_CHAT_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const getCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_CALL_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const setCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_CALL_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const getLiveHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_LIVE_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const setLiveHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_LIVE_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const getGiftHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_GIFT_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const setGiftHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_GIFT_HISTORY_BY_ASTROLOGER_ID,
    payload
});

export const getReviewByAstrologerId = payload => ({
    type: actionTypes.GET_REVIEW_BY_ASTROLOGER_ID,
    payload
});

export const setReviewByAstrologerId = payload => ({
    type: actionTypes.SET_REVIEW_BY_ASTROLOGER_ID,
    payload
});

export const getTransactionByAstrologerId = payload => ({
    type: actionTypes.GET_TRANSACTION_BY_ASTROLOGER_ID,
    payload
});

export const setTransactionByAstrologerId = payload => ({
    type: actionTypes.SET_TRANSACTION_BY_ASTROLOGER_ID,
    payload
});

export const updateWalletByAstrologerId = payload => ({
    type: actionTypes.UPDATE_WALLET_BY_ASTROLOGER_ID,
    payload
});

export const verifyAstrologerProfile = payload => ({
    type: actionTypes.VERIFY_ASTROLOGER_PROFILE,
    payload
});

export const changeAstrologerChatStatus = payload => ({
    type: actionTypes.CHANGE_ASTROLOGER_CHAT_STATUS,
    payload
});

export const changeAstrologerCallStatus = payload => ({
    type: actionTypes.CHANGE_ASTROLOGER_CALL_STATUS,
    payload
});