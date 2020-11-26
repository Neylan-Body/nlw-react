import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-fc71b5d8-176d-470f-838e-d4bf3f746942.ws-us02.gitpod.io'
    // baseURL: 'http://localhost:3333'
});

export default api;