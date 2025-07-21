import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://e-com-backend-sx5w.onrender.com',

})

export default axiosInstance