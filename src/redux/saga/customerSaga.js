
import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { change_customer_banned_unbanned_status, create_customer, delete_customer_by_id, get_customer, get_customer_by_id, update_customer_by_id } from "../../utils/api-routes";

function* getCustomer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_customer);
    console.log("Get Customer Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CUSTOMER, payload: data?.customers?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Customer Saga Error ::: ", error);
  }
}

function* getCustomerById(action) {
  try {
    const { payload } = action;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_customer_by_id, payload);
    console.log("Get Customer By Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CUSTOMER_BY_ID, payload: data?.results });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Customer By Id Saga Error ::: ", error);
  }
}

function* createCustomer(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_customer, payload?.data);
    console.log("Create Customer Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Customer Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Customer Saga Error ::: ", error);
  }
}

function* updateCustomerById(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_customer_by_id, payload?.data);
    console.log("Update Customer By Id Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Customer Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Customer By Id Saga Error ::: ", error);
  }
}

function* deleteCustomerById(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_customer_by_id, payload);
      console.log("Delete Customer By Id Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Customer Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_CUSTOMER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Customer By Id Saga Error ::: ", error);
  }
}

function* changeCustomerBannedUnbannedStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to  ${!payload?.status ? 'Banned' : 'Unbanned'} this Customer!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_customer_banned_unbanned_status, payload);
      console.log("Change Customer Banned-Unbanned Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: `Customer has been ${!payload?.status ? 'Banned' : 'Unbanned'}`, showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_CUSTOMER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Customer Banned-Unbanned Status Saga Error ::: ", error?.response?.data);
  }
}

export default function* customerSaga() {
  yield takeLeading(actionTypes?.GET_CUSTOMER, getCustomer);
  yield takeLeading(actionTypes?.GET_CUSTOMER_BY_ID, getCustomerById);
  yield takeLeading(actionTypes?.CREATE_CUSTOMER, createCustomer);
  yield takeLeading(actionTypes?.UPDATE_CUSTOMER_BY_ID, updateCustomerById);
  yield takeLeading(actionTypes?.DELETE_CUSTOMER_BY_ID, deleteCustomerById);
  yield takeLeading(actionTypes?.CHANGE_CUSTOMER_BANNED_UNBANNED_STATUS, changeCustomerBannedUnbannedStatus);
}