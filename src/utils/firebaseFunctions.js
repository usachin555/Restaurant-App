import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { firestore } from "../firebase.config";


// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const addToCart = async (data) => {

  const user = JSON.parse(localStorage.getItem('user'))
console.log("local uSER:"+user)

  console.log(user);
  // if()
  const items = await getDocs(
    query(
      collection(firestore, "cartItems"),
      orderBy("id", "desc"), 
      where("id", "==", data.id)
      // where('userId','==',user.uid)
    )
  );
  let cart = items.docs.map((doc) => doc.data());
  if (cart.length > 0) {
    console.log(items.docs[0].ref);
    let cartRef = items.docs[0].ref;
    let count = cart[0].qty;
    let qty = cart[0].qty;
    count++;
    await updateDoc(cartRef, {
      qty: count,
      price:(data.price)*count
    });
  } else {
    data.userId = user.uid
    await setDoc(doc(firestore, "cartItems", `${Date.now()}`), data, {
      merge: true,
    });
  }
};

export const getAllcartItems = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const items = await getDocs(
    query(collection(firestore, "cartItems"), orderBy("id", "desc"),where('userId','==',user.uid))
  );

  return items.docs.map((doc) => doc.data());
};

export const removeFromCart = async (data) => {
  const user = JSON.parse(localStorage.getItem('user'))

  console.log(data);
  // if()
  const items = await getDocs(
    query(
      collection(firestore, "cartItems"),
      orderBy("id", "desc"),
      where("id", "==", data.id),
    ));

  let cart = items.docs.map((doc) => doc.data());
  if (cart.length > 0) {
    // console.log(items.docs[0].ref);
    let cartRef = items.docs[0].ref;
    let count = cart[0].qty;
    let qty =cart[0].qty
    if(count>1){
      count--
      await updateDoc(cartRef, {
        qty: count,
        price:(data.price)*count
      });
    }else{
      await deleteDoc(cartRef);
    }
  } else {
    console.log("element not found")
  }
};


export const clearCart = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const items = await getDocs(
    query(collection(firestore, "cartItems"), orderBy("id", "desc"),where('userId','==',user.uid))
  );

  return items.docs.map((doc) => deleteDoc(doc.ref));
};