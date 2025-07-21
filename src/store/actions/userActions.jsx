import axiosInstance from "../../api/axiosconfig"
import { setUser } from "../reducers/userSlice"

export const asyncRegisterUser = (user) => async (dispatch,getState) => {
    try {
        const response = await axiosInstance.post('/users', user)
        console.log('Registration successful', response.data)
        dispatch(setUser(response.data))
    } catch (error) {
        console.log('Registration failed', error)
    }
}