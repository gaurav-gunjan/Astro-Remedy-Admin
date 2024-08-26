import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { add_skill, add_subSkill, api_url, delete_skill, delete_subSkill, get_expertise, get_skills, get_subSkill, update_skill, update_subSkill, } from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import { Color } from "../../assets/colors";

function* createSkill(actions) {
  try {
    const { payload } = actions;
    console.log("Actions ::: ", actions)
    console.log("Payload ::: ", payload)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_skill,
      header: "form",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Skill Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getSkills() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_skills,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_SKILLS,
        payload: response?.skills,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateSkill(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_skill,
      header: "form",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ALL_SKILLS, payload: null })

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Skill Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteSkill(actions) {
  try {
    const { payload } = actions;
    console.log("Action ::: ", actions)
    console.log("Payload ::: ", payload)

    const result = yield Swal.fire({ title: `Are you sure?`, text: "You want to delete this skill!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "red", confirmButtonText: "Delete", })

    console.log("Result ::: ", result)

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_skill,
        header: "json",
        data: {
          skillId: payload?.skill_id
        },
      });

      if (response.success) {
        Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_ALL_SKILLS, payload: null })

      } else {
        Swal.fire({ icon: "error", title: "Failed To Delete Skill", showConfirmButton: false, timer: 2000, });
      }
    }


    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* createSubSkill(actions) {
  try {
    const { payload } = actions;
    console.log("Actions ::: ", actions)
    console.log("Payload ::: ", payload)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_subSkill,
      header: "json",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub Skill Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Sub Skill Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getSubSkills() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_subSkill,
    });
    console.log(response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_SUB_SKILLS,
        payload: response?.subSkill,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateSubSkill(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_subSkill,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub Skill Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.GET_ALL_SUB_SKILLS, payload: null })

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Sub Skill Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteSubSkill(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.subskill}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    })

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_subSkill,
        header: "json",
        data: {
          subSkillId: payload?.sub_skill_id
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Skill Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_SUB_SKILLS, payload: null })
        yield put({ type: actionTypes.GET_ALL_SKILLS, payload: null })

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Skill Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }


    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}


export default function* skillsSaga() {
  yield takeLeading(actionTypes.GET_ALL_SKILLS, getSkills);
  yield takeLeading(actionTypes.CREATE_SKILL, createSkill);
  yield takeLeading(actionTypes.UPDATE_SKILL, updateSkill);
  yield takeLeading(actionTypes.DELETE_SKILL, deleteSkill);

  yield takeLeading(actionTypes.GET_ALL_SUB_SKILLS, getSubSkills);
  yield takeLeading(actionTypes.CREATE_SUB_SKILL, createSubSkill);
  yield takeLeading(actionTypes.UPDATE_SUB_SKILL, updateSubSkill);
  yield takeLeading(actionTypes.DELETE_SUB_SKILL, deleteSubSkill);
}
