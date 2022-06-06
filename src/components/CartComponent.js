
import { CartProvider, useCart } from "react-use-cart";
import { useState } from "react";
import "./CartComponent.css";


export default function CartComponent({cartState,setCartState}){


    const {
        addItem,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        totalItems ,
        emptyCart 
      } = useCart();

      


      const handleCloseCart = ()=>{
        setCartState(false)

      }

      const handleClearCart = ()=>{
        emptyCart()
        setCartState(false)
      }
   

    if (cartState){
  
    return(
    
   
       
        <div className="cartContainer">
            {(isEmpty)?
            <>
            <div className="emptyCart"><p>Your Cart is Empty</p></div>
            <div className="close" onClick={handleCloseCart}>X</div>
            </>
            
            :
        
        <>
            {items.map((item) => (
                <>
                        <div className="cartItem" key={item.id}>
                            
                                    <div className="itemDesc">
                                            <p className="itemName">{item.name}</p>
                                            <p className="itemPrice">$ {item.price*item.quantity}</p>
                                            <p className="itemQuantity">{item.quantity}</p>
                                            <p className="itemQuantity">{item.totalItems}</p>
                                        <div className="updateItems">
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                            <button onClick={() => removeItem(item.id)}>Remove Item</button>
                                        </div>
                                        

                                    </div>
                                    <div className="itemImage">
                                        <img className="image" src={item.image.src}/>
                                    </div>
                                


                        </div>
                        <div className='itemDividerLine'></div>
                            
                </>
                    
            ))}
                            <div>
                                <p className="clearItems" onClick={handleClearCart }>Clear</p>
                            </div>

                            <div className="close" onClick={handleCloseCart}>X</div>
            </>
}
        </div>  
    )
}

}