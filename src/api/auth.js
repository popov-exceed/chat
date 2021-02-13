import axios from "axios";

const api =  axios.create({
    responseType: "json",
    baseURL: process.env.REACT_APP_API_HOST
});



export default {
    login: (name) => api.post("/login", {name})
}
