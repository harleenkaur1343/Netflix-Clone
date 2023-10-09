import axios from "axios";
//package 

//set a base url for api requests '

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3"
});

export default instance;