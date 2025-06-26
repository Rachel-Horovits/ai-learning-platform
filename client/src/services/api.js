import axios from "axios";
const API_URL = "http://localhost:5000/api";

export function loginUser(name, phone) {
  return axios.post(`${API_URL}/users`, { name, phone });
}

export function getCategories() {
  return axios.get(`${API_URL}/categories`);
}

export function getSubCategories(categoryId) {
  return axios.get(`${API_URL}/subcategories?categoryId=${categoryId}`);
}

export function sendPrompt(data) {
  return axios.post(`${API_URL}/prompts`, data);
}

export function getHistory(userId) {
  return axios.get(`${API_URL}/prompts?userId=${userId}`);
}

export function getUsers() {
  return axios.get(`${API_URL}/users`);
}