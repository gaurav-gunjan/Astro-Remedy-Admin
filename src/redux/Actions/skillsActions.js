import * as actionTypes from "../actionTypes";

export const createSkill = payload =>({
    type: actionTypes.CREATE_SKILL,
    payload
})

export const getSkillData = payload =>({
    type: actionTypes.GET_ALL_SKILLS,
    payload
})

export const setSkillsData = payload =>({
    type: actionTypes.SET_ALL_SKILLS,
    payload
})

export const updateSkill = payload =>({
    type: actionTypes.UPDATE_SKILL,
    payload
})

export const deleteSkill = payload =>({
    type: actionTypes.DELETE_SKILL,
    payload
})

export const createSubSkill = payload =>({
    type: actionTypes.CREATE_SUB_SKILL,
    payload
})

export const getSubSkillData = payload =>({
    type: actionTypes.GET_ALL_SUB_SKILLS,
    payload
})

export const setSubSkillData = payload =>({
    type: actionTypes.SET_ALL_SUB_SKILLS,
    payload
})

export const updateSubSkill = payload =>({
    type: actionTypes.UPDATE_SUB_SKILL,
    payload
})

export const deleteSubSkill = payload =>({
    type: actionTypes.DELETE_SUB_SKILL,
    payload
})