import * as actionTypes from "../actionTypes";

export const getAllAstrologer = (payload) => ({
  type: actionTypes.GET_ALL_ASTROLOGER,
  payload,
});

export const setAllAstrologer = (payload) => ({
  type: actionTypes.SET_ALL_ASTROLOGER,
  payload,
});

export const updateAstrologerChatStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
  payload,
});

export const updateAstrologerCallStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
  payload,
});

export const getEnquiryAstrologers = payload => ({
  type: actionTypes.GET_ENQUIRY_ASTROLOGERS,
  payload
})

export const setEnquiryAstrologers = payload => ({
  type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
  payload
})

export const updateEnquiryStatus = payload => ({
  type: actionTypes.UPDATE_ENQUIRY_STATUS,
  payload
})

export const updateAstrologerData = payload => ({
  type: actionTypes.UPDATE_ASTROLOGER_DATA,
  payload
})

export const addAstrologer = payload => ({
  type: actionTypes.ADD_ASTROLOGER,
  payload
})

export const verifyUnverifyAstrologer = payload => ({
  type: actionTypes.VERIFY_UNVERIFY_ASTROLOGER,
  payload
})

export const deleteAstrologer = payload => ({
  type: actionTypes.DELETE_ASTROLOGER,
  payload
})

export const createQualification = payload => ({
  type: actionTypes.CREATE_QUALIFICATION,
  payload
})

export const getQualification = payload => ({
  type: actionTypes.GET_QUALIFICATION,
  payload
})

export const updateQualification = payload => ({
  type: actionTypes.UPDATE_QUALIFICATION,
  payload
})

export const setQualification = payload => ({
  type: actionTypes.SET_QUALIFICATION,
  payload
})


export const getAstroRequest = payload => ({
  type: actionTypes.GET_REQUEST_ASTROLOGER,
  payload
})

export const setAstroRequest = payload => ({
  type: actionTypes.SET_REQUEST_ASTROLOGER,
  payload
})

export const updateAstroRequest = payload => ({
  type: actionTypes.UPDATE_REQUEST_ASTROLOGER,
  payload
})

export const getRecentLiveStreaming = payload => ({
  type: actionTypes.GET_RECENT_LIVE_STREAMING,
  payload
})

export const setRecentLiveStreaming = payload => ({
  type: actionTypes.SET_RECENT_LIVE_STREAMING,
  payload
})

export const getAstrologerInquiry = payload => ({
  type: actionTypes.GET_ASTROLOGER_INQUIRY,
  payload
})

export const setAstrologerInquiry = payload => ({
  type: actionTypes.SET_ASTROLOGER_INQUIRY,
  payload
})