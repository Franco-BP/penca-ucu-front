import axios from 'axios';
const BASE_URL = 'http://localhost:9000';

const axiosGet = (customUrl) => {
    return axios.get(`${BASE_URL}${customUrl}`);
}
const axiosPost = (customUrl, body) => {
    return axios.post(`${BASE_URL}${customUrl}`, body);
}

const axiosPut = (customUrl, body) => {
    return axios.put(`${BASE_URL}${customUrl}`, body);
};

const axiosDelete = (customUrl, body) => {
    axios.delete(`${BASE_URL}${customUrl}`, {data: body});
}

export const getWithResponseManage = (customUrl) => {
    return axiosGet(customUrl)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log("Error:" + error)
            return error
        })
}
export const postWithResponseManage = (customUrl, body) => {
    return axiosPost(customUrl, body)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log("Error:" + error)
            return error
        })
}
export const putWithResponseManage = (customUrl, body) => {
    return axiosPut(customUrl, body)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log("Error:" + error);
            return error;
        });
};
export const deleteWithoutResponseManage = (customUrl, body) => {
    axiosDelete(customUrl, body);
};
