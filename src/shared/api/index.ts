import axios from "axios";

const URL = "https://localhost:5000/api";

const api = axios.create({ baseURL: URL });

export default api;
