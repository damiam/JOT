import axios from "axios";

export default axios.create({
  baseURL: "https://jsearch.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
});
