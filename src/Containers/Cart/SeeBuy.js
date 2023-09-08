import React from 'react';
import { Container } from '@mui/material'
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export const SeeBuy = ({ ventas }) => {
  return (
    <Container sx={{ padding: 5, display: "flex", textAlign: "center" }}>
      <div>
        <Title> Detalle de productos:</Title>
        <Stack textAlign="center" margin="10px" divider={<Divider orientation="horizontal" flexItem />}>
          {ventas.items.map(prod =>
            <Stack direction={{ xs: 'column' }}
              alignItems="start"
              margin="10px"
              spacing={{ xs: 1, sm: 2, md: 2 }} key={prod.id}>
              <Text>Producto: {prod.title}</Text>
              <Text>Talle: {prod.size} </Text>
              <Text>Cantidad: {prod.quantity}</Text>
            </Stack>
          )}
        </Stack>
        <Price>TOTAL: ${ventas.total}</Price>
      </div>
    </Container>


  )
}

const Title = styled.h1`
  font-weight: 200;
  color: white;
  @media (max-width:360px){
    font-size:1.2rem;
  }
`;

const Price = styled.span`
  font-weight: 100;
  color:white;
  font-size: 40px;
  @media (max-width:360px){
    font-size:1.2rem;
  }
`;
const Text = styled.h3`
  font-weight: 200;
  color:white;
  fontsize: 1.2rem;
  @media (max-width:360px){
    font-size:1rem;
    text-Align:start;
  }
`