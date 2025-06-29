// src/services/api.js

import axios from "axios";
const API_URL = "http://localhost:5000/api";

// יצירת מופע axios עם Interceptor להוספת Authorization header
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------- פונקציות למשתמש רגיל -----------------

// הרשמה/התחברות
export function loginUser(name, phone) {
  return api.post(`/users`, { name, phone });
}

// קבלת קטגוריות
export function getCategories() {
  return api.get(`/categories`);
}

// קבלת תתי קטגוריות לפי קטגוריה
export function getSubCategories(categoryId) {
  return api.get(`/subcategories?categoryId=${categoryId}`);
}

// שליחת פרומפט
export function sendPrompt(data) {
  return api.post(`/prompts`, data);
}

// קבלת היסטוריית פרומפטים של המשתמש הנוכחי
export function getHistory(userId) {
  return api.get(`/prompts?userId=${userId}`);
}

// ----------------- פונקציות למנהל בלבד -----------------

// יצירת מנהל חדש
export function createAdmin(name, phone) {
  return api.post(`/admin/users/admin`, { name, phone });
}

// קבלת כל המשתמשים
export function getAllUsers() {
  return api.get(`/admin/users`);
}

// מחיקת משתמש
export function deleteUser(userId) {
  return api.delete(`/admin/users/${userId}`);
}

// קבלת כל הפרומפטים של משתמש (או של כולם)
export function getAllPrompts(userId) {
  // אם רוצים את כל הפרומפטים של משתמש מסוים
  if (userId) {
    return api.get(`/admin/prompts?userId=${userId}`);
  }
  // אם רוצים את כל הפרומפטים במערכת
  return api.get(`/admin/prompts`);
}

// מחיקת פרומפט
export function deletePrompt(promptId) {
  return api.delete(`/admin/prompts/${promptId}`);
}

// יצירת קטגוריה
export function createCategory(name) {
  return api.post(`/admin/categories`, { name });
}

// קבלת כל הקטגוריות (אפשר גם דרך getCategories)
export function getAllCategories() {
  return api.get(`/admin/categories`);
}

// מחיקת קטגוריה
export function deleteCategory(categoryId) {
  return api.delete(`/admin/categories/${categoryId}`);
}

// יצירת תת-קטגוריה
export function createSubCategory(name, category) {
  return api.post(`/admin/subcategories`, { name, category });
}

// קבלת כל תתי הקטגוריות (אפשר גם לפי קטגוריה)
export function getAllSubCategories(categoryId) {
  if (categoryId) {
    return api.get(`/admin/subcategories?categoryId=${categoryId}`);
  }
  return api.get(`/admin/subcategories`);
}

// מחיקת תת-קטגוריה
export function deleteSubCategory(subCategoryId) {
  return api.delete(`/admin/subcategories/${subCategoryId}`);
}