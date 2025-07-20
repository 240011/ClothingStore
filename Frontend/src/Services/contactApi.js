import axios from "axios";

const API = "http://localhost:3000/api/contact";

export const getContacts = () => {
  const token = localStorage.getItem("authToken");
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
