import axios from 'axios';
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import Swal from "sweetalert2";
import { api_url, create_astro_puja_puja, delete_astro_puja_puja, get_astro_puja_accepted, get_astro_puja_puja, get_astro_puja_rejected, get_astro_puja_request, get_customer_booked_pooja, update_astro_puja_puja, update_astro_puja_request } from '../../utils/api-routes';
import { Color } from '../../assets/colors';

function* getAstroPujaPuja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_astro_puja_puja}`);
        console.log("Get Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_PUJA_PUJA, payload: data?.pooja });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astropuja Puja Saga Error ::: ", error)
    }
}

function* createAstroPujaPuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + create_astro_puja_puja}`, payload?.data);
        console.log("Create Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Pooja added successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
        } else {
            Swal.fire({ icon: "error", title: data?.message, showConfirmButton: false, timer: 2000, });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Server Error', text: "Failed To Create", showConfirmButton: false, timer: 2000, });
        console.log("Create Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}

function* updateAstroPujaPuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + update_astro_puja_puja}`, payload?.data);
        console.log("Update Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Pooja updated successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
            yield put({ type: actionTypes.GET_ASTRO_PUJA_PUJA, payload: null })
        }

    } catch (error) {
        console.log("Update Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}

function* deleteAstroPujaPuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ title: `Are You Sure ?`, text: "You Want To Delete", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "red", confirmButtonText: "Delete", })

        if (result.isConfirmed) {
            const { data } = yield call(axios.post, `${api_url + delete_astro_puja_puja}`, payload);
            console.log("Delete Astropuja Puja Saga Response ::: ", data)
            if (data?.success) {
                Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ASTRO_PUJA_PUJA, payload: null })
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Delete", showConfirmButton: false, timer: 2000, });
        console.log("Delete Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}

function* getAstroPujaRequest() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_astro_puja_request}`);
        console.log("Get Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_PUJA_REQUEST, payload: data?.orders.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astropuja Puja Saga Error ::: ", error)
    }
}

function* updateAstroPujaRequest(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)
        console.log(api_url + update_astro_puja_request)
        const { data } = yield axios.post(api_url + update_astro_puja_request, payload)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_ASTRO_PUJA_REQUEST, payload: null })
            yield put({ type: actionTypes.GET_ASTRO_PUJA_ACCEPTED, payload: null })
            yield put({ type: actionTypes.GET_ASTRO_PUJA_REJECTED, payload: null })

        }

    } catch (error) {
        console.log("Update Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}

function* getAstroPujaAccepted() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_astro_puja_accepted}`);
        console.log("Get Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_PUJA_ACCEPTED, payload: data?.orders.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astropuja Puja Saga Error ::: ", error)
    }
}

function* getAstroPujaRejected() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_astro_puja_rejected}`);
        console.log("Get Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_PUJA_REJECTED, payload: data?.orders.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astropuja Puja Saga Error ::: ", error)
    }
}

function* getAstroPujaBooked() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_customer_booked_pooja}`);
        console.log("Get Astropuja Puja Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_PUJA_BOOKED, payload: data?.orders });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astropuja Puja Saga Error ::: ", error)
    }
}



export default function* astromallSaga() {
    yield takeLeading(actionTypes?.GET_ASTRO_PUJA_PUJA, getAstroPujaPuja);
    yield takeLeading(actionTypes?.CREATE_ASTRO_PUJA_PUJA, createAstroPujaPuja);
    yield takeLeading(actionTypes?.UPDATE_ASTRO_PUJA_PUJA, updateAstroPujaPuja);
    yield takeLeading(actionTypes?.DELETE_ASTRO_PUJA_PUJA, deleteAstroPujaPuja);
    yield takeLeading(actionTypes?.GET_ASTRO_PUJA_REQUEST, getAstroPujaRequest);
    yield takeLeading(actionTypes?.UPDATE_ASTRO_PUJA_REQUEST, updateAstroPujaRequest);
    yield takeLeading(actionTypes?.GET_ASTRO_PUJA_ACCEPTED, getAstroPujaAccepted);
    yield takeLeading(actionTypes?.GET_ASTRO_PUJA_REJECTED, getAstroPujaRejected);
    yield takeLeading(actionTypes?.GET_ASTRO_PUJA_BOOKED, getAstroPujaBooked);
}
