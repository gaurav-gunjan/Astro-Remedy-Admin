import axios from "axios";
import { base_url } from "./Constants";

const postData = async (url, body, isFile) => {
    const headers = {
        headers: { "content-type": isFile ? "multipart/form-data" : "application/json", },
    };

    let { data } = await axios.post(`${base_url + url}`, body, headers);
    return data;
};

const getData = async (url) => {
    let { data } = await axios.get(`${base_url + url}`);
    return data;
};







const putData = async (url, body, isFile = false) => {
    try {
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json",
            },
        };
        var response = await axios.put(`${base_url + url}`, body, headers);
        return response.data;
    } catch (error) {
        return false;
    }
};

const deleteData = async (url, body, isFile = false) => {
    try {
        const headers = {
            headers: "application/json",
        };
        var response = await axios.delete(`${base_url + url}`, body, headers);
        return response.data;
    } catch (error) {
        return false;
    }
};

export { postData, getData, putData, deleteData };
