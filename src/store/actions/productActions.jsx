import axiosInstance from "../../api/axiosconfig"
import { setProducts, setLoading } from "../reducers/productSlice"
import { toast } from "../../components/CustomToast.jsx";

export const asyncGetProducts = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.get('/products')
        dispatch(setProducts(data))
        dispatch(setLoading(false));
    } catch (error) {
        console.log('Error fetching products', error)
        dispatch(setLoading(false));
        toast.error('Failed to load products');
    }
}
