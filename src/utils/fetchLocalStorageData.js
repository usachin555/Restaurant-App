import { getAllcartItems } from "./firebaseFunctions";

export const fetchUser= () => {
    const userInfo = localStorage.getItem('user') !== "undefined" ?
    JSON.parse(localStorage.getItem('user'))
    : localStorage.clear();

    return userInfo
}

export const fetchCart= async() => {
    await getAllcartItems().then((data)=>{
        let cartInfo = data
        console.log(cartInfo)
        return cartInfo ? cartInfo : []
   }).catch(e=>console.log(e))

}