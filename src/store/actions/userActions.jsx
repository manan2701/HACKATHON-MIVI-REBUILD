import { toast } from "react-toastify"
import axiosInstance from "../../api/axiosconfig"
import { setUser } from "../reducers/userSlice"


export const saveUser = (user) => async (dispatch,getState) => {
    try {
        localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.log('Registration failed', error)
    }
}

export const asyncRegisterUser = (user) => async (dispatch,getState) => {
    try {
        const response = await axiosInstance.post('/users', user)
        console.log('Registration successful', response.data)
        dispatch(setUser(response.data))
        toast.success('Registration successful')
    } catch (error) {
        console.log('Registration failed', error)
        toast.error('Registration failed')
    }
}

export const asyncLoginUser = (user, navigate) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.post(`/users/login`, {
      email: user.email,
      password: user.password
    });
    console.log(data);
    
    dispatch(saveUser(data));
    dispatch(setUser(data));
    toast.success('Login successful');
    navigate('/');
  } catch (error) {
    console.log('Login failed', error);
    toast.error('Invalid email or password');
  }
};


export const asyncLogoutUser = () => async (dispatch,getState) => {
    try {
        localStorage.removeItem('user')
        dispatch(setUser(null))
        toast.success('Logout successful')
    } catch (error) {
        console.log('Logout failed', error)
        toast.error('Logout failed')
    }
}

export const asyncCurrentUser = () => async (dispatch,getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user) dispatch(setUser(user))
    } catch (error) {
        console.log(error);
    }
}

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
    try{
        const {data} = await axiosInstance.patch(`/users/${id}`,user)
        localStorage.setItem("user", JSON.stringify(data))
        dispatch(setUser(data))
    } catch (error) {
        console.log(error);
    }
}