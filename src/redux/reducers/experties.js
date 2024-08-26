import * as actionTypes from "../actionTypes";

const initialState = {
  expertiesData: null,
  mainExpertiesData: null,
};
 
const experites = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_EXPERTIES: {
      return {
        ...state, 
        expertiesData: payload,
      };
    }

    case actionTypes.SET_ALL_MAIN_EXPERTIES: {
      return {
        ...state,
        mainExpertiesData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default experites;
