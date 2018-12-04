import axios from 'axios';

const REQ_URL =
    process.env.NODE_ENV !== 'development'
        ? '/data/quest'
        : 'http://localhost:3000/data/quest';

export default {
    add: item => axios.post(REQ_URL, item).then(({ data }) => data),
    getById: id => axios.get(`${REQ_URL}/${id}`).then(({ data }) => data),
    update: item => axios.put(REQ_URL, item).then(({ data }) => data),
    remove: id => axios.delete(`${REQ_URL}/${id}`),
    query: () => axios.get(REQ_URL).then(({ data }) => data),
    getByIds: ids => axios.put(`${REQ_URL}/ids`, ids).then(({ data }) => data),
}

