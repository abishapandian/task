import React, { useEffect ,useState } from 'react'
import '../Style/Cart.css'

export default function Cart() {
  const [card, setcard] = useState(null);
    useEffect(()=>{
      const carditem = JSON.parse(localStorage.getItem("carddata"))
      if(carditem){
        setcard(carditem)
      }
    },[])
    if(!card){
      return<p>cart is Empty...!</p>
    }
  return (
    <>
      <div>
        {card.name}
        <br />
        {card.quantity}
        <br />
        {card.price}
      </div>
    </>
  );
}
