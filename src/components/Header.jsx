import React, { useEffect, useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion"

import { getAuth, signInWithPopup, GoogleAuthProvider, applyActionCode } from "firebase/auth";
import {auth, firestore} from '../firebase.config'
import Logo from '../img/logo.png'
import Avatar from "../img/avatar.png"
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from "../context/reducer";
import { app } from '../firebase.config';
import MenuContainer from './MenuContainer';
import { setDoc,doc } from 'firebase/firestore';
import { getAllcartItems } from '../utils/firebaseFunctions';


const Header = () => {

  
  
  
  const scrollBottom = () => {
    document.querySelector(`#menu`).scrollIntoView()
    // console.log(e)
    // e.current?.scrollIntoView({
      //   behavior: "smooth"
      // });
    };
    
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    const [{user, cartShow}, dispatch] = useStateValue();
    // const [cartItem,setCartItem] = useState(cartItems)

  const [isMenu, setIsMenu] = useState(false)

  const login = async ()=>{
   if(!user){
    try {
      const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
    dispatch({
      type : actionType.SET_USER,
      user : providerData[0],
     });
    //  const logger = auth.currentUser
     console.log(providerData[0])
    var userRef = doc(firestore, "user", providerData[0].uid);
    // console.log(userRef)
      localStorage.setItem('user', JSON.stringify(providerData[0]))
      await setDoc(userRef,providerData[0])
      
    } catch (error) {
      console.log(error);
    }
    
   }else{
      setIsMenu(!isMenu);
   }
  };

  const logout = () => {
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type : actionType.SET_USER,
      user: null,
    });
  }


  const showCart = async() => {
    let user = localStorage.getItem('user')
    if(user){

      dispatch({
        type : actionType.SET_CART_SHOW,
         cartShow: !cartShow,
       });
    }else{
      login()
    }

  }

  // useEffect(()=>{
  //    getAllcartItems().then((data)=>{
  //     console.log(data)
  //     setCartItem(data)
  //   })
  // },[cartItems])
  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
      {/* desktop, tablet */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
          <Link to={"/"} className='flex items-center gap-2'>
            <motion.img whileTap={{scale: 0.6}} 
            src={Logo} className='w-8 object-cover' alt="logo" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </Link>

        <div className='flex items-center gap-8'>
          <motion.ul initial={{opacity : 0, x : 200}}
          animate={{opacity : 1, x : 0}}
          exit={{opacity : 0, x : 200}} className="flex items-center gap-24">
            <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer' onClick={()=>document.querySelector(`#home`).scrollIntoView()}>
              Home
            </li>
            <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer' onClick={()=>scrollBottom()}>
              Menu
            </li>
            {/* <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer'>
              About Us
            </li> */}
            {/* <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer'>
              Service
             </li> */}
          </motion.ul>

          <div className='relative flex items-center justify-center' onClick={showCart}>
             <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer "/>
             {/* {cartItems && cartItems.length > 0 && (
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>{cartItem.length}</p>
             </div>
             )} */}
        </div>

         <div className='relative'>
         <motion.img whileTap={{scale: 0.6}} 
          src={user ? user.photoURL : Avatar} 
          className="w-10 min-w-[40] h-10 min-h-[40]
          drop-shadow-2xl cursor-pointer rounded-full"
          alt="userprofile" 
          onClick={login}
          />
          {
            isMenu && (
              <motion.div 
              initial={{opacity : 0, scale : 0.6}} 
              animate={{opacity : 1, scale : 1}} 
              exit={{opacity : 0, scale : 0.6}} 
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
          {
            user && user.email === "sachinsac805@gmail.com" && (
             <Link to={'/createItem'}> 
              <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition=all duration ease-in-out text-textColor text-base' onClick={() => setIsMenu(false) } >New Item <MdAdd/></p>
             </Link>
            )
          }
          <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition=all duration ease-in-out text-textColor text-base' onClick={logout}>Logout <MdLogout/></p>
          </motion.div>
            )
          }
          </div>

         </div>
      </div>

      {/* mobile */}
      <div className='flex items-center justify-between md:hidden w-full h-full'>

          <div className='relative flex items-center justify-center' onClick={showCart}>
             <MdShoppingBasket className="text-textColor text-2xl cursor-pointer "/>
             {/* {cartItems && cartItems.length > 0 && (
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
             </div>
             )} */}
        </div>

        <Link to={"/"}className='flex items-center gap-2'>
            <motion.img whileTap={{scale: 0.6}} 
            src={Logo} className='w-8 object-cover' alt="logo" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </Link>

          <div className='relative'>
         <motion.img whileTap={{scale: 0.6}} 
          src={user ? user.photoURL : Avatar} 
          className="w-10 min-w-[40] h-10 min-h-[40]
          drop-shadow-2xl cursor-pointer rounded-full"
          alt="userprofile" 
          onClick={login}
          />
          {
            isMenu && (
              <motion.div 
              initial={{opacity : 0, scale : 0.6}} 
              animate={{opacity : 1, scale : 1}} 
              exit={{opacity : 0, scale : 0.6}} 
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
          {
            user && user.email === "sachinsac805@gmail.com" && (
             <Link to={'/createItem'}> 
              <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition=all duration ease-in-out text-textColor text-base'>New Item <MdAdd/></p>
             </Link>
            )
          }

<ul className="flex flex-col">
            <li className='text-base text-textColor hover:text-headingColor duration 100
            transitio-all ease-in-out cursor-pointer  hover:bg-slate-100  px-4 py-2 ' onClick={() => setIsMenu(false) }>
              Home
            </li>
            <li className='text-base text-textColor hover:text-headingColor duration 100
            transitio-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2 ' onClick={() => setIsMenu(false) }>
              Menu
            </li>
            {/* <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2 ' onClick={() => setIsMenu(false) }>
              About Us
            </li>
            <li className='text-base text-textColor hover:text-headingColor duration-100
            transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2' onClick={() => setIsMenu(false) }>
              Service
            </li> */}
          </ul>

          <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}>Logout <MdLogout/></p>
          </motion.div>
            )
          }
          </div>
      </div>

    </header>

  )
}

export default Header