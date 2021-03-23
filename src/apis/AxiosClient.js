import axios from 'axios';

var AxiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  /* other custom settings */
});

AxiosClient.interceptors.request.use(
  function success(config){
    const jwt = window.localStorage['jwt'];
    if(jwt){
      config.headers['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
  }
);
export default AxiosClient;