import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import {
  api_url,
  get_call_history,
  get_chat_history,
  get_expertise,
  get_main_expertise,
} from "../../utils/api-routes";
import { database, firestore } from "../../config/firbase";
import { get, onValue, orderByChild, ref } from "firebase/database";
import { doc, getDoc, collection, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";


function* getChatHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_chat_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_HISTORY,
        payload: response?.history.reverse(),
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

async function fetchCustomerFirebaseID(firebaseID) {
  try {
    // Assuming you have a function to fetch customerFirebaseID from Firebase
    const customerFirebaseID = await get(ref(database, 'UserId/' + firebaseID));
    return customerFirebaseID?.val();
  } catch (error) {
    throw error;
  }
}

async function fetchAstroFirebaseID(firebaseId) {
  try {
    // Assuming you have a function to fetch customerFirebaseID from Firebase
    const astroFirebaseID = await get(ref(database, 'UserId/' + firebaseId));
    return astroFirebaseID?.val();
  } catch (error) {
    throw error;
  }
}

async function getChatData(chatId) {
  try {
    // Reference to the messages in Realtime Database
    const messagesRef = ref(database, `ChatMessages/${chatId}`);
    const messagesQuery = query(messagesRef, orderByChild('addedAt'));
    const snapshot = await get(messagesQuery);

    if (snapshot.exists()) {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        messages.push(childSnapshot.val());
      });
      return messages.reverse(); // Reversing to get descending order
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    throw e; // Rethrow the error to be handled elsewhere
  }
}

function* getChatSummary(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions;
    const chatId = `customer_${payload?.customerID}_astro_${payload?.astroID}`
    const messages = yield call(getChatData, chatId)
    if (messages) {
      let chatData = messages.map(item => {
        const user = {
          id: item?.user?._id.toString().toLocaleLowerCase(),
          avatar: item?.user?.avatar
        }

        let media = null

        if (typeof item?.image != 'undefined') {
          media = {
            type: 'image',
            url: item?.image,
            size: '',
            name: ''
          }
        }

        if (typeof item?.file != 'undefined') {
          media = {
            type: 'file',
            url: item?.file?.url,
            size: '',
            name: item?.file?.fileType
          }
        }

        if (!!media) {
          return {
            ...item, createdAt: new Date(item?.createdAt), user, media
          }
        }
        return {
          ...item, createdAt: new Date(item?.createdAt), user,
        }

      })
      yield put({ type: actionTypes.SET_CHAT_SUMMARY, payload: chatData.reverse() })
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getCallHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_call_history,
    });
    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_HISTORY,
        payload: response?.history,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}


export default function* historySaga() {
  yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory);
  yield takeLeading(actionTypes.GET_CHAT_SUMMARY, getChatSummary)
  yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory)
}
