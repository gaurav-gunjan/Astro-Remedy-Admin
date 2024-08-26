import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, ban_customer, create_customer, delete_customer, get_all_customers, update_customer } from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import axios from "axios";

function* getCustomers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_customers
    })

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_CUSTOMER, payload: response?.customers.reverse() })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteCustomers(actions) {
  try {
    const { payload } = actions

    const result = yield Swal.fire({
      title: `Are you sure? `,
      text: "You want to delete this user!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    })

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_customer,
        header: 'json',
        data: {
          customerId: payload?.customerId
        }
      })

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Customer has been deleted!",
          icon: "success",
        });
        yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: null })
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Customer",
          icon: "error",
        });
      }
    }



    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* banCustomers(actions) {
  try {
    const { payload } = actions

    const result = yield Swal.fire({
      title: `Are you sure, you want to  ${!payload?.status ? 'Ban' : 'Unban'} ${payload?.customerName}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: !payload?.status ? 'Banned ' : 'Unbanned',
    })

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + ban_customer,
        header: 'json',
        data: {
          customerId: payload?.customerId
        }
      })


      if (response.success) {
        Swal.fire({
          title: !payload?.status ? 'Banned!' : 'Unbanned!',
          text: `Customer has been ${!payload?.status ? 'Banned!' : 'Unbanned!'}`,
          icon: "success",
        });
        yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: null })
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to ban the Customer",
          icon: "error",
        });
      }
    }



    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateCustomer(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_customer,
      header: "form",
      data: payload?.data,
    });

    if (response) {
      if (response.success) {
        // yield call(payload?.onSuccess(false)) 
        Swal.fire({
          icon: "success",
          title: "Customer Updated Successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        yield call(payload?.onComplete)
        yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: null })
      } else {
        Swal.fire({
          icon: "error",
          title: "Warning",
          text: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to edit customer",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* createCustomer(actions) {
  try {
    const { payload } = actions;
    console.log("Actions ::: ", actions)
    console.log("Payload ::: ", payload)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const data = yield ApiRequest.postRequest({
      url: api_url + create_customer,
      header: "form",
      data: payload?.data,
    });

    console.log("Create Customer Response ::: ", data)
    if (data?.success) {
      Swal.fire({ icon: "success", title: "Customer Added Successfully", showConfirmButton: false, timer: 2000, });
      // yield call(payload?.onComplete)
    } else {
      Swal.fire({ icon: "error", title: "Warning", text: data?.response?.data?.message, showConfirmButton: false, timer: 2000, });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* customerSaga() {
  yield takeLeading(actionTypes.GET_ALL_CUSTOMER, getCustomers)
  yield takeLeading(actionTypes.DELETE_CUSTOMER, deleteCustomers)
  yield takeLeading(actionTypes.BAN_CUSTOMER, banCustomers)
  yield takeLeading(actionTypes.UPDATE_CUSTOMER, updateCustomer)
  yield takeLeading(actionTypes.CREATE_CUSTOMER, createCustomer)
}
