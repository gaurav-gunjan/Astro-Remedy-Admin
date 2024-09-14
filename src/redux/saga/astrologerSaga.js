import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import { add_astrologer, api_url, change_astrologer_call_status, change_astrologer_chat_status, change_call_status, change_chat_status, change_enquiry_status, create_qualifications, delete_astrologer, get_all_astrologers, get_astrologer, get_astrologer_by_id, get_astrologer_inquiry, get_call_history_by_astrologer_id, get_chat_history_by_astrologer_id, get_enquired_astrologer, get_qualifications, get_recent_live_streaming, get_request_astrologer, update_astrologer, update_qualifications, update_request_astrologer, verify_astrologer, verify_astrologer_profile, } from "../../utils/api-routes";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import { getAPI, postAPI } from "../../utils/api-function";
import { Color } from "../../assets/colors";

function* addAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_astrologer,
      header: "form",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null });
      yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });

      yield call(payload?.onComplete);
    } else {
      Swal.fire({
        icon: "error",
        title: response?.response?.data?.message,
        text: "Failed to add Astrologer",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.GET_ALL_ASTROLOGER });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_astrologers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ALL_ASTROLOGER,
        payload: response?.astrologers.reverse(),
      });
    }
    console.log(response?.astrologers)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getEnquiryAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_enquired_astrologer,
    });

    console.log(response);

    if (response.success) {
      yield put({
        type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
        payload: response?.enquiredAstrologer,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateAstrologerChatStatus(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_chat_status,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        title: "Updated!",
        text: "Chat Status has been updated!",
        icon: "success",
      });
    }

    console.log(response);

    yield put({ type: actionTypes.GET_ALL_ASTROLOGER });
    yield put({ type: actionTypes.GET_ASTROLOGER });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateAstrologerCallStatus(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + change_call_status,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        title: "Updated!",
        text: "Call Status has been updated!",
        icon: "success",
      });
    }

    console.log(response);
    yield put({ type: actionTypes.GET_ALL_ASTROLOGER });
    yield put({ type: actionTypes.GET_ASTROLOGER });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateEnquiryStatus(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


    const response = yield ApiRequest.postRequest({
      url: api_url + change_enquiry_status,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        title: "Updated!",
        text: "Enquiry Status has been updated!",
        icon: "success",
      });
    }
    console.log(response);

    yield put({ type: actionTypes.GET_ENQUIRY_ASTROLOGERS });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateAstrologerData(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_astrologer,
      header: "form",
      data: payload?.data,
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: "Astrologer profile update successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null });
      yield call(payload?.onComplete);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Astrologer",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    console.log(response);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* verifyUnverifyAstrologer(actions) {
  try {
    const { payload } = actions;
    console.log(payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`,
      text: `You want to  ${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'} this Astrologer!!!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: `${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'}`,
    });

    if (result?.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + verify_astrologer,
        header: "json",
        data: payload,
      });

      if (response?.success) {
        if (response?.unverified) {
          Swal.fire({
            icon: "error",
            title: "Warning",
            text: response?.message,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: response?.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }


        // yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null })
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null })

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Status Change failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteAstrologer(actions) {
  try {
    const { payload } = actions;
    console.log(payload);

    const result = yield Swal.fire({
      title: "Are you sure ?",
      text: "You want to delete this astrologer!!!",
      // text: "This Astrologer will be verified for active in App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Delete",
    });

    if (result?.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      console.log("Saga ::: ", payload)
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_astrologer,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Astrologer has been deleted.",
          icon: "success",
        });
        if (payload?.type == 'Enquiry') {
          yield put({ type: actionTypes.GET_ASTROLOGER_INQUIRY, payload: null })
        } else {
          yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null })
          yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
        }
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the AStrologer",
          icon: "error",
        });
      }
    }
    // yield put({ type: actionTypes.GET_ALL_ASTROLOGER });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* createQualification(actions) {
  try {
    const { payload } = actions;

    console.log("Actions ::: ", actions)
    console.log("Payload ::: ", payload)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_qualifications,
      header: "form",
      data: payload?.data,
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: "Your Qualification Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_QUALIFICATION, payload: { astrologerId: payload?.astrologerId } })
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Quaification Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Quaification Submission Failed",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function* getQualification(actions) {
  const { payload } = actions;
  console.log("Payload ::: ", payload)
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + get_qualifications,
      header: "json",
      // data: { "astrologerId": "65def1111d0819bcc6a99767" },
      data: payload,
    });

    console.log("Payload Inside::: ", payload)
    console.log("Get Qualification Response Saga :: ", response)
    if (response.success) {
      yield put({ type: actionTypes.SET_QUALIFICATION, payload: response?.qualifications });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateQualification(actions) {
  try {
    const { payload } = actions;

    console.log("Actions ::: ", actions)
    console.log("Payload ::: ", payload)
    console.log("Payload Id Edit ::: ", payload?.astrologerIdEdit)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_qualifications,
      header: "form",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Your Qualification Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_QUALIFICATION, payload: { astrologerId: payload?.astrologerIdEdit } })
      yield call(payload?.onClose)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Quaification Updated Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Quaification Updated Failed",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function* getAstroRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_request_astrologer,
    });

    if (response.success) {
      yield put({ type: actionTypes.SET_REQUEST_ASTROLOGER, payload: response?.requests });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateAstroRequest(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_request_astrologer,
      header: "json",
      data: { requestId: payload?.requestId },
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Request Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      yield call(payload?.handleClose)
      yield put({ type: actionTypes.GET_REQUEST_ASTROLOGER, payload: null })

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Astrologer",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getRecentLiveStreaming() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_recent_live_streaming,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_RECENT_LIVE_STREAMING,
        payload: response?.results.reverse(),
      });
    }
    console.log(response?.results)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAstrologerInquiry() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_astrologer_inquiry,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_INQUIRY,
        payload: response?.astrologerInquiry.reverse(),
      });
    }
    console.log(response?.results)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

//! New API
function* getAstrologer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_astrologer);
    console.log("Get Astrologer Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ASTROLOGER, payload: data?.astrologers?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astrologer Saga Error ::: ", error);
  }
}

function* getAstrologerById(action) {
  try {
    const { payload } = action;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_astrologer_by_id, payload);
    console.log("Get Astrologer By Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ASTROLOGER_BY_ID, payload: data?.results });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astrologer By Id Saga Error ::: ", error);
  }
}

function* getChatHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_chat_history_by_astrologer_id, payload);
    console.log("Get Chat History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CHAT_HISTORY_BY_ASTROLOGER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Chat History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getCallHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_call_history_by_astrologer_id, payload);
    console.log("Get Call History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CALL_HISTORY_BY_ASTROLOGER_ID, payload: data?.data });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Call History By Astrologer Id Saga Error ::: ", error);
  }
}

function* verifyAstrologerProfile(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to  ${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'} this Astrologer!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(verify_astrologer_profile, payload);
      console.log("Verify Astrologer Profile Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: payload?.isVerified == 'true' ? 'Astrologer is set to verified' : 'Astrologer is set to unverified', showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Verify Astrologer Profile Saga Error ::: ", error?.response?.data);
  }
}

function* changeAstrologerChatStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);
    yield call(payload?.onComplete);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change chat status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_astrologer_chat_status, payload?.data);
      console.log("Change Astrologer Chat Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Chat status has been updated', showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Astrologer Chat Status Saga Error ::: ", error?.response?.data);
  }
}

function* changeAstrologerCallStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);
    yield call(payload?.onComplete);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change call status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_astrologer_call_status, payload?.data);
      console.log("Change Astrologer Call Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Call status has been updated', showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Astrologer Call Status Saga Error ::: ", error?.response?.data);
  }
}

export default function* astrologerSaga() {
  yield takeLeading(actionTypes.GET_ALL_ASTROLOGER, getAstrologers);
  yield takeLeading(actionTypes.GET_ENQUIRY_ASTROLOGERS, getEnquiryAstrologers);

  yield takeLeading(actionTypes.UPDATE_ENQUIRY_STATUS, updateEnquiryStatus);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_DATA, updateAstrologerData);
  yield takeLeading(actionTypes.ADD_ASTROLOGER, addAstrologer);
  yield takeLeading(actionTypes.DELETE_ASTROLOGER, deleteAstrologer)
  yield takeLeading(actionTypes.CREATE_QUALIFICATION, createQualification);
  yield takeLeading(actionTypes.GET_QUALIFICATION, getQualification);
  yield takeLeading(actionTypes.UPDATE_QUALIFICATION, updateQualification);
  yield takeLeading(actionTypes.GET_REQUEST_ASTROLOGER, getAstroRequest);
  yield takeLeading(actionTypes.UPDATE_REQUEST_ASTROLOGER, updateAstroRequest);
  yield takeLeading(actionTypes.GET_RECENT_LIVE_STREAMING, getRecentLiveStreaming);
  yield takeLeading(actionTypes.GET_ASTROLOGER_INQUIRY, getAstrologerInquiry);

  //! Need To Change 
  yield takeLeading(actionTypes.VERIFY_UNVERIFY_ASTROLOGER, verifyUnverifyAstrologer); //? Not Required
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS, updateAstrologerChatStatus); //? Not Required
  yield takeLeading(actionTypes.UPDATE_ASTROLOER_CALL_STATUS, updateAstrologerCallStatus); //? Not Required

  //! New API
  yield takeLeading(actionTypes?.GET_ASTROLOGER, getAstrologer);
  yield takeLeading(actionTypes?.GET_ASTROLOGER_BY_ID, getAstrologerById);
  yield takeLeading(actionTypes?.GET_CHAT_HISTORY_BY_ASTROLOGER_ID, getAstrologer);
  yield takeLeading(actionTypes?.VERIFY_ASTROLOGER_PROFILE, verifyAstrologerProfile);
  yield takeLeading(actionTypes?.GET_CHAT_HISTORY_BY_ASTROLOGER_ID, getChatHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_CALL_HISTORY_BY_ASTROLOGER_ID, getCallHistoryByAstrologerId);
  yield takeLeading(actionTypes?.CHANGE_ASTROLOGER_CHAT_STATUS, changeAstrologerChatStatus);
  yield takeLeading(actionTypes?.CHANGE_ASTROLOGER_CALL_STATUS, changeAstrologerCallStatus);
}
