import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
    const id = String(itemId);
    if (!cartItems[id]) {
        setCartItems((prev) => ({ ...prev, [id]: 1 }));
    } else {
        setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
};


    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);

            if (itemInfo && itemInfo.price) {
                totalAmount += itemInfo.price * cartItems[item];
            } else {
                console.warn("Item not found or missing price:", item);
            }
        }
    }
    return totalAmount;
};


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>


    )
}

export default StoreContextProvider