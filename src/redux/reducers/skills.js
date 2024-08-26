import * as actionTypes from "../actionTypes";

const initialState = {
  skillsData: null, 
  subSkillData: null
};

const skills = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_SKILLS: {
      return {
        ...state,
        skillsData: payload,
      };
    }

    case actionTypes.SET_ALL_SUB_SKILLS: {
      return {
        ...state,
        subSkillData: payload,
      };
    }

    default: { 
      return state;
    }
  }
};

export default skills;
