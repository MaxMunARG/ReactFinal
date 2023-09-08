import React, { useState } from 'react'
import styled from '@emotion/styled';
import ItemCount from '../../components/ItemCount';
import Swal from 'sweetalert2';
import { Box } from '@mui/system';
import withReactContent from 'sweetalert2-react-content'
import { useCartContext } from '../../Context/CartContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const MySwal = withReactContent(Swal)

export const ItemDetail = ({ listproduct }) => {
  const medidas = listproduct.talles
  const { addItem } = useCartContext();
  const [enCarrito, setEnCarrito] = useState(false)
  const [size, setSize] = useState("");
  const [stocks, setStocks] = useState("");
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setSize(e.target.value[0]);
    setStocks(e.target.value[1])
    setShow(true)
  };
  const onAdd = (count) => {
    MySwal.fire({
      title: "Listo!",
      text: `Se agregan ${count} al carrito`,
    });
    addItem(listproduct, count, size);
    setEnCarrito(true)
  }

  return (
    <>
      <H1>Detalle del producto</H1>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }}
        justifyContent="space-around"
        alignItems={{ xs: "center", md: "flex-start" }}
        textAlign="center"
        margin="auto"
        spacing={{ xs: 1, sm: 2, md: 5 }} >
        <Box sx={{ maxWidth: { xs: 200, sm: 500 } }}>
          <Grid container spacing={1} justifyContent="space-around" >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Image src={listproduct.imagen1} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Image src={listproduct.imagen2} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Image src={listproduct.imagen3} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 400 }}>
          <Title>{listproduct.title}</Title>
          <Desc>
            {listproduct.description2}
          </Desc>
          <Price>Precio: ${listproduct.price}</Price>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-autowidth-label">Talle</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={medidas.length ? [size, stocks] : ""}
                label="Talle"
                onChange={handleChange}
              >
                {Object.entries(medidas).map(([variante, value]) => (
                  <MenuItem key={variante} value={[variante, value]}>{variante}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          {!show ?
            <h2>elija un talle</h2>
            : stocks > 1 ?
              <Box sx={{ width:{md: "50%",xs:"70%"}, margin: "0 auto" }}>
                <p>Talle: {size}</p>
                <p>Stock: {stocks}</p>
                <ItemCount initial={1} stock={stocks} onAdd={onAdd} enCarrito={enCarrito} />
              </Box>
              : "Sin Stock"}
        </Box>
      </Stack>
    </>
  )
}

const H1 = styled.h1`
  text-align:center;
  color: white;
  @media (max-width:360px){
    font-size:1.2rem;
  }
`;

const Image = styled.img`
  width: 100%;
  margin: 10px 5px;
`;

const Title = styled.h1`
  font-weight: 200;
  color: white;
  @media (max-width:360px){
    font-size:1.2rem;
  }   
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: white;
  @media (max-width:360px){
    font-size:0.8rem;
  }
`;

const Price = styled.span`
  font-weight: 100;
  color:white;
  font-size: 40px;
  @media (max-width:360px){
    font-size:0.8rem;
  }
`;

