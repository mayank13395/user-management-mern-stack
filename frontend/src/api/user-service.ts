import axios from "axios";
const USER_ENDPOINT = "http://localhost:8081/user/";

interface ILoginParams {
    email: string
    password: string
}

export const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    if (token) {
        return { 'x-access-token': token };
    } else {
        return {
            'x-access-token': null
        };
    }
}

export const login = (params: ILoginParams) => {
    return axios
        .post(USER_ENDPOINT + "login", params)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }
            return response.data;
        });
}

export const logout = () => {
    localStorage.removeItem("token");
}

interface IRegisterParams {
    firstName: string
    lastName: string
    email: string
    password: string
}

export const register = (params: IRegisterParams) => {
    return axios.post(USER_ENDPOINT + "register", params);
}

export const getUserProfile = () => {
    return axios.get(USER_ENDPOINT + "user-details", { headers: authHeader() })
}

interface IUpdateUserProfile {
    firstName: string
    lastName: string
    email: string
    password: string
}

export const updateUserProfile = (params: IUpdateUserProfile) => {
    return axios.post(USER_ENDPOINT + "update-user-info", params, { headers: authHeader() })

}

export const getLoggedInStatus = () => {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    console.log("token:-", token);
    if (typeof token === 'string') return true
    else return false
}



export const updateProfileImage = (formData: any) => {
    return axios.post(USER_ENDPOINT + "update-profile-pic", formData, { headers: authHeader() })
}

