import axios from "axios";
 
const API = "http://localhost:3000/api/users";
 
export const getUsers = () => axios.get(API);
export const getUserById = (id) => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createUser = (data) => axios.post(API, data);
export const updateUser = (id, data) => {
  const token = localStorage.getItem("authToken");
  return axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteUser = (id) => axios.delete(`${API}/${id}`);
