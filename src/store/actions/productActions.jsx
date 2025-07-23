import axiosInstance from "../../api/axiosconfig"
import { setProducts } from "../reducers/productSlice"

export const asyncGetProducts = () => async (dispatch, getState) => {
    try {
        const { data } = await axiosInstance.get('/products')
        dispatch(setProducts(data)) 
    } catch (error) {
        console.log('Error fetching products', error)
    }
}   