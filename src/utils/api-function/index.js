import axios from "axios";
import { base_url } from "../api-routes";
// import { access_token } from "../constant";

export const getAPI = async (url) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.get(base_url + url, { headers: { Authorization: 'Bearer ' + token } })
    return response;
}

export const postAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.post(base_url + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const putAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.put(base_url + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const patchAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.patch(base_url + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const deleteAPI = async (url) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.delete(base_url + url, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}