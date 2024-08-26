import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerListData: [],
  qualificationData: [],
  astroRequestData: [],
  astroLiveData: [],
  enquiryAstroData: [],
};

const astrologer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_ASTROLOGER: {
      return {
        ...state,
        astrologerListData: payload,
      };
    }



    case actionTypes.SET_QUALIFICATION: {
      return {
        ...state,
        qualificationData: payload,
      };
    }

    case actionTypes.SET_REQUEST_ASTROLOGER: {
      return {
        ...state,
        astroRequestData: payload,
      };
    }

    case actionTypes.SET_RECENT_LIVE_STREAMING: {
      return {
        ...state,
        astroLiveData: payload,
      };
    }

    case actionTypes.SET_ASTROLOGER_INQUIRY: {
      return {
        ...state,
        enquiryAstroData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default astrologer;
