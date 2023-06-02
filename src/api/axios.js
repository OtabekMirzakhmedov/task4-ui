import axios from 'axios';

export default axios.create({
    baseURL: 'https://task4api.azurewebsites.net'
});