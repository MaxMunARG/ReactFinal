import React, { useState, useEffect } from "react";
import { ItemList } from "./ItemList";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { db } from "../../Firebase/Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import styled from '@emotion/styled';


const ItemListContainer = ({ greeting }) => {

    const [listproducts, setListProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const { categoria } = useParams()
    
    useEffect(() => {
        const productsCollection = collection(db, "products");
        const q = categoria ? query(productsCollection, where("categoria", "==", `${categoria}`)) :
            query(productsCollection, where("destacados", "==", true))

        getDocs(q)
            .then((data) => {
                const lista = data.docs.map((product) => {
                    return {
                        ...product.data(),
                        id: product.id,
                    }
                })
                setListProducts(lista)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setTimeout(() => {
                    setShow(true)
                }, 1500)
            })
    }, [categoria])


    return (
        <>
            <H1>{greeting}</H1>
            <H2>{categoria}</H2>
            {show ? <ItemList listproducts={listproducts} />
                : error ? <p>error</p>
                    : <CircularProgress sx={{ margin: "10% auto", display: "flex", alignItems: "center", justify: "center" }} />}
        </>
    )
}

export default ItemListContainer


const H1 = styled.h1`
    text-align:center;
    color: white;
    @media (max-width: 560px) {
    font-size:1rem;
}
`;

const H2 = styled.h1`
    text-align:center;
    color: white;
`;
