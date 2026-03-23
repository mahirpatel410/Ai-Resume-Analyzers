import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzers-production.up.railway.app"
});

export default API;