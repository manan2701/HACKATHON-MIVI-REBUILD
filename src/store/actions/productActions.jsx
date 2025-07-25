import axiosInstance from "../../api/axiosconfig"
import { setProducts, setLoading } from "../reducers/productSlice"
import { toast } from "../../components/ui/CustomToast.jsx";

export const asyncGetProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.get('/products')
        dispatch(setProducts(data))
    } catch (error) {
        dispatch(setLoading(false));
        toast.error('Failed to load products');
    }
}
