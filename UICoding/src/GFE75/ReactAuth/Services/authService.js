import axios from "axios";
import api, { API_URL } from "./mockApi";

const login = (email, password) => {
  return api.login(email, password).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};
const logout = () => {
  localStorage.removeItem("user");
};

const signup = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.userDetails;
};

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

export default { login, logout, signup, getAuthToken, getCurrentUser };
