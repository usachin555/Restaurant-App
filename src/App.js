import React, { useEffect, useState ,useRef} from 'react';
import {Routes, Route} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CreateContainer, Header, MainContainer } from './components';
import { getAllFoodItems, getAllcartItems } from './utils/firebaseFunctions';
import { useStateValue } from './context/StateProvider';
import { actionType } from "./context/reducer"

const App = () => {

  const[{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data
      })
    });
    await getAllcartItems().then((data)=>{
      dispatch({
        type : actionType.SET_CARTITEMS,
        cartItems:data
      })
 }).catch(e=>console.log(e))
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <AnimatePresence mode='wait'> 
    <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header/>
      <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
        <Routes>
           <Route path='/*' element={<MainContainer />}/> 
           <Route path='/createItem' element={<CreateContainer/>}/>
        </Routes>
      </main>
    </div>
    </AnimatePresence>
    
  )
};

export default App;