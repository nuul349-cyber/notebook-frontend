import axios from "axios";
const baseUrl = '/api/notes'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data
        })
        // .catch(reason => {console.log(reason)})
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(response => response.data)
}

const update = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
}

export default { getAll, create, update, }