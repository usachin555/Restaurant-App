import { fetchUser, fetchCart } from "../utils/fetchLocalStorageData";

const cartInfo = fetchCart()
const userInfo = fetchUser()



export const initialState = {
    user : userInfo, 
    foodItems: null,
    cartShow : false,
    cartItems : null,
}