import axios from "axios";

export const register = async (user) =>
    await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
    await axios.post(`${process.env.REACT_APP_API}/login`, user);

export const update = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/update`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

export const sendMail = async (user, token) =>
    await axios.post(`${process.env.REACT_APP_API}/send-mail`, user, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

export const verificationStatus = async (user, token) =>
    await axios.post(`${process.env.REACT_APP_API}/verification-status`, user, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

// Update user in localStorage

export const updateUserInLocalStorage = (user, next) => {
    if(window.localStorage.getItem("auth")) {
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = user;
        localStorage.setItem("auth", JSON.stringify(auth));
        next();
    }
};