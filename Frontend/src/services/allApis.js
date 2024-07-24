import { commonApi } from "./commonApi";
import base_url from "./server_url";

//User registration
export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

//User Login
export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}

//Adding Expense
export const addExpense = async (data, header) => {
    return await commonApi("POST", `${base_url}/add-expense`, data, header)
}

// getting expenses of login user 
export const getExpense = async (header) => {
    return await commonApi("GET", `${base_url}/get-expense`, "", header)
}

//Editing expense
export const editExpense = async (data, header, id) => {
    return await commonApi("PUT", `${base_url}/edit-expense/${id}`, data, header)
}

//Delete Expense
export const removeExpense = async (header, id) => {
    return await commonApi("DELETE", `${base_url}/remove-expense/${id}`, {}, header)
}