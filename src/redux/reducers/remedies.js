import * as actionTypes from "../actionTypes";

const initialState = {
  remediesData: null,
};
 
const remedies = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_REMEDIES: {
      return {
        ...state,
        remediesData: payload,
      };
    }

    default: { 
      return state;
    }
  }
};

export default remedies;
