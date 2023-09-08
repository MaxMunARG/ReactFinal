import React, { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({ children }) => {

    let cartLocal = JSON.parse(localStorage.getItem("cart"));
    if (cartLocal === null) {
        cartLocal = [];
    }

    const [cart, setCart] = useState(cartLocal);
        
    const isInCart = (id) => cart.find(item => item.id === id);
    
    const addItem = (producto, quantity,size) => {
        if (isInCart(producto.id)) {
            const  newCart = cart.map(item => {
                if(item.id === producto.id){
                const newQuantity = item.quantity + quantity;
                return {...item, quantity: newQuantity}
                } else {
                    return item
                }
            })
            setCart(newCart)
        } else {
            const newProducto= {...producto, size:size, quantity: quantity};
            setCart([...cart, newProducto]);

        }
    };
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const reset = () => {
        setCart([]);
    };

    const totalQuantity = ()=> {
        return cart.reduce((acc,element) => acc +  element.quantity,0)
    }

    const totalPrice = ()=> {
        return cart.reduce((acc,element) => acc + (element.price * element.quantity),0)
    }


    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, reset, totalPrice, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;