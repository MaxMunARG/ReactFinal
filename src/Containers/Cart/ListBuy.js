import React, { useState } from 'react';
import { Container } from '@mui/material'
import styled from '@emotion/styled';
import { db } from "../../Firebase/Firebase";
import { getDoc, collection, doc } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { SeeBuy } from './SeeBuy';

export const ListBuy = () => {

    const [search, setSearch] = useState("");
    const [ventas, setVentas] = useState({});
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [confirmar, setConfirmar] = useState(false);

    const handlerOnChange = (e) => {
        setSearch(e.target.value);
    };

    const limpiar = () => {
        setShow(false)
        setSearch("")
        setVentas({})
        setConfirmar(false)
    }

    const finalizar = () => {
        setLoading(true)
        const ventasCollection = collection(db, "ventas");
        const refDoc = doc(ventasCollection, search);
        getDoc(refDoc)
            .then((res) => {
                const product = {
                    id: res.id,
                    ...res.data()
                }
                setVentas(product);
                if (product.items === undefined) {
                    setShow(false)
                    setConfirmar(true)
                } else { setShow(true) }
            })
            .catch(() => {
                setError(true);
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }

    return (
        <>
            <H1>Listado de compras</H1>
            <Container sx={{ maxWidth:{md: 400} }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="compra"
                    name="compra"
                    label="id de compra"
                    type="text"
                    fullWidth
                    value={search}
                    variant="standard"
                    onChange={handlerOnChange}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between" >
                    <Button onClick={finalizar} variant="contained" color="success">Ver compra</Button>
                    <Button onClick={limpiar} variant="contained" color="error">Limpiar</Button>
                </Stack>
                {loading ?
                    <CircularProgress sx={{ margin: "10% auto", display: "flex", alignItems: "center", justifyContent: "center" }} />
                    : show ? < SeeBuy ventas={ventas} />
                        : confirmar && !show ? <H2>no se han encontrado ventas para ese id</H2> : <H2>Ingrese id para ver su compra</H2>}
            </Container>
        </>
    )
}

const H1 = styled.h1`
    font-weight: 300;
    text-align:center;
    color:white;
`;

const H2 = styled.h2`
    text-align:center;
    margin: 10px;
    @media (max-width: 560px) {
    font-size:1rem;
}
`;
