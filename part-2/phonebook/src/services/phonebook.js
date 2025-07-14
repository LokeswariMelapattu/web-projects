import axios from 'axios';

const apiUrl = '/api/persons';

const getAll = () =>
    axios
        .get(apiUrl)
        .then((response) => response.data);

const create = (newPerson) =>
    axios
        .post(apiUrl, newPerson)
        .then((response) => response.data);

const update = (id, updatedPerson) =>
    axios
        .put(`${apiUrl}/${id}`, updatedPerson)
        .then((response) => response.data);

const remove = (id) =>
    axios
        .delete(`${apiUrl}/${id}`)
        .then((response) => response.data);

export default { getAll, create, update, remove };

