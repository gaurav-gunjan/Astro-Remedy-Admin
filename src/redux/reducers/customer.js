import * as actionTypes from "../action-types";

const initialState = {
  customerListData: [],
};

const customer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_CUSTOMER: {
      return {
        ...state,
        customerListData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default customer;
