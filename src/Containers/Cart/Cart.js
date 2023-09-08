import React from 'react'
import { useCartContext } from '../../Context/CartContext'
import { Box, Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { CartForm } from '../../components/CartForm';

export const Cart = () => {
  const { cart, totalPrice, totalQuantity, removeItem, reset } = useCartContext()
  return (
    <>
      <H1>Pedidos</H1>
      <Stack textAlign="center" margin="10px" divider={<Divider orientation="horizontal" flexItem />}>
        {cart.map(prod =>
          <Stack direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            margin="10px"
            spacing={{ xs: 1, sm: 2, md: 10 }} key={prod.id}>
            <Image src={prod.imagen1} />
            <Title>{prod.title}</Title>
            <Text>Subtotal: ${prod.price * prod.quantity}</Text>
            <Text>Cantidad: {prod.quantity}</Text>
            <Text>talle:  {prod.size}</Text>
            <Button style={{ borderRadius: 35, height: "fit-content", backgroundColor: "#424949", fontSize: "12px" }} variant="contained" startIcon={<DeleteIcon />}
              onClick={() => removeItem(prod.id)}>Eliminar</Button>
          </Stack>
        )}
        {totalQuantity() === 0 ?
          <DataContainer >
            <H2>No hay pedidos</H2>
            <Link to={`/`} style={{ textDecoration: 'none', color: "white" }}>
              <Button variant="contained" color="primary"> Ir a Tienda</Button>
            </Link>
          </DataContainer> :
          <Box sx={{ flex: 1, padding: "10px 50px", margin: "15px auto", backgroundColor: "white", maxWidth: "300px" }}>
            <h2>Cantidad de Productos: {totalQuantity()}</h2>
            <h2>TOTAL: ${totalPrice()}</h2>
            <Button variant="contained" color="error" onClick={reset}>Vaciar Carrito</Button>
            <CartForm />
          </Box>}
      </Stack>
    </>
  )
}

const Image = styled.img`
  width: 100px;
  margin: 15px 0px 0px;
`;

const H1 = styled.h1`
  text-align:center;
  color: white;
  @media (max-width: 560px) {
    font-size:20px;
}
`;

const H2 = styled.h2`
  text-align:center;
  color: white;
  margin: 10px;
  @media (max-width: 560px) {
    font-size:20px;
}
`;

const Title = styled.h2`
  font-weight: 200;
  color: white;
  width: 200px;
`;


const Text = styled.h3`
  font-weight: 200;
  color:white;
  fontsize: 20px;
`

const DataContainer = styled.div`
margin: 15px;
text-align:center;
`;

