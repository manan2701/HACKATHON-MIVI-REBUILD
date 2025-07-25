import { toast } from "../../components/ui/CustomToast.jsx"
import axiosInstance from "../../api/axiosconfig"
import { setUser, clearUser } from "../reducers/userSlice"

export const saveUser = (user) => async (dispatch) => {
    try {
        localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        toast.error('Failed to save user data')
    }
}

export const asyncRegisterUser = (user) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/users', user)
        dispatch(setUser(response.data))
        toast.success('Registration successful')
    } catch (error) {
        toast.error('Use Different Email or try again')
    }
}

export const asyncLoginUser = (user, navigate, redirectPath = '/') => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post(`/users/login`, {
      email: user.email,
      password: user.password
    });
    
    dispatch(saveUser(data));
    dispatch(setUser(data));
    toast.success('Login successful');
    
    navigate(redirectPath);
  } catch (error) {
    toast.error('Invalid email or password');
  }
};

export const asyncLogoutUser = (navigate) => (dispatch) => {
    try {
        localStorage.removeItem('user')
        dispatch(clearUser())
        toast.success('Logout successful')
        navigate("/");
    } catch (error) {
        toast.error('Logout failed')
    }
}

export const asyncCurrentUser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user) dispatch(setUser(user))
    } catch (error) {
        // Silent fail - user not in local storage
    }
}

export const asyncupdateuser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(setUser(data));
    return true; 
  } catch (error) {
    return false; 
  }
};

export const asyncaddToCart = (user, product, selectedColorName) => async (dispatch) => {
  try {  
    const colorEntry = product.color.find((colorObj) => colorObj[selectedColorName]);
    const colorImageUrl = colorEntry?.[selectedColorName];

    const updatedProduct = {
      ...product,
      color: [{ name: selectedColorName, image: colorImageUrl }]
    };

    const updatedCart = [...(user.cart)];
    const index = updatedCart.findIndex(
      (item) => item.product?._id === product._id && item?.product?.color[0]?.name === selectedColorName
    );

    if (index === -1) {
      updatedCart.push({ product: updatedProduct, quantity: 1 });
    } else {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity + 1,
      };
    }

    const updatedUser = { ...user, cart: updatedCart };

    await axiosInstance.patch(`/users/${user._id}`, updatedUser);
    dispatch(asyncupdateuser(user._id, updatedUser));
    toast.success("Added To Cart!");
  } catch (error) {
    toast.error("Failed to add to cart.");
  }
};

export const asyncPlaceOrder = (user, orderData) => async (dispatch) => {
  try {
    const newOrder = {
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      orderId: `MIVI${Math.floor(Math.random() * 10000)}`
    };
    
    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), newOrder],
      cart: []
    };

    await axiosInstance.patch(`/users/${user._id}`, updatedUser);
    dispatch(asyncupdateuser(user._id, updatedUser));
    
    toast.success("Order placed successfully!");
    return true;
  } catch (error) {
    toast.error("Failed to place order.");
    return false;
  }
};

export const asyncForgotPassword = (email) => async () => {
  try {
    await axiosInstance.get(`/users/email/${email}`);
    toast.success('Password reset link sent to your email');
    return true;
  } catch (error) {
    toast.error('Password reset failed. Please check your email and try again.');
    return false;
  }
};

