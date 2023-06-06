import axios from 'axios';

const api = axios.create({
    baseURL: 'http://dados.recife.pe.gov.br'
});

export default api;