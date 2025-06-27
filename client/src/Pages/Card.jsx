import React, { useState } from 'react'
import '../Style/card.css'
import { useNavigate } from 'react-router-dom';
export default function Card() {
  const [card, setcard] = useState([
    { id: 1, name: "apple", quantity: 1, price: 20 },
    { id: 2, name: "orange", quantity: 1, price: 22 },
    { id: 3, name: "mango", quantity: 1, price: 25 },
    { id: 4, name: "pineapple", quantity: 1, price: 30 },
  ]);
  const navigate = useNavigate();
  const addtocart = () =>{
    localStorage.setItem("carddata" , JSON.stringify(card))
  }
  const selecteditem = (id) =>{
    const carditem = card.find((value) => (value.id === id))
    localStorage.setItem("carddata" , JSON.stringify(carditem)) 
    navigate("/cart")
  }

  const decrease = (id) =>{
    const updatedcard = card.map(
      (item) => item.id === id &&
      item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            price: item.price - item.price / item.quantity,
          }
        : item
    );
    setcard(updatedcard)
    addtocart();
  }

  const increase = (id) => {
    const updatedcard = card.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + item.price / item.quantity,
          }
        : item
    );
    setcard(updatedcard);
    addtocart();
  };
  const remove = (id) =>{
    const removeitem = card.filter((item)=>(item.id !== id))
    setcard(removeitem)
    addtocart();
  }
  return (
    <>
      {card.map((item) => (
        <div>
          <section className="card">
            <div>{item.name}</div>
            <div className="quant">
              <div className="one" onClick={() => decrease(item.id)}>
                --
              </div>
              <div className="one">{item.quantity}</div>
              <div className="one" onClick={() => increase(item.id)}>
                +
              </div>
            </div>
            <div>Rs:{item.price}</div>
            <button onClick={() => selecteditem(item.id)}>add to cart</button>
            <button onClick={()=>remove(item.id)}>remove</button>
          </section>
        </div>
      ))}
    </>
  );
}
