import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useCartContext } from "../../Context/CartContext";



const CartWidget = () => {
    const { totalQuantity } = useCartContext();

    return (
        <div>
            <IconButton >
                <ShoppingCart /> 
                <Badge badgeContent={totalQuantity()} color="secondary"/>       
            </IconButton>
        </div>

    )
}

export default CartWidget