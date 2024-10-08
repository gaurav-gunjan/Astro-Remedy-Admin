import * as actionTypes from "../action-types";

const initialState = {
  expertiseData: [],
  mainExpertiseData: [],
};

const expertiseReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_EXPERTISE:
      return { expertiseData: payload }

    case actionTypes.SET_MAIN_EXPERTISE:
      return { mainExpertiseData: payload }

    default: {
      return state;
    }
  }
};

export default expertiseReducer;