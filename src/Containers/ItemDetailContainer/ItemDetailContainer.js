import React, { useState, useEffect } from 'react'
//import productos from './Productos/ProducData'
import { ItemDetail } from './ItemDetail'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { db } from "../../Firebase/Firebase";
import { getDoc, collection, doc } from 'firebase/firestore';

export const ItemDetailContainer = () => {

    const [listproduct, setListProduct] = useState({});
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        const productCollection= collection(db,'products');
        const refDoc = doc(productCollection, id);
        getDoc(refDoc)
        .then((res) => {
            const product = {
                id: res.id,
                ...res.data()
            }
            setListProduct(product)
        })
        .catch(()=>{
            setError(true);
        })
        .finally(()=>{
            setTimeout(() => {
                setShow(true)
            }, 1500) 
        })
    }, [id])    

    return (
        <>
            {show ? <ItemDetail listproduct={listproduct} /> 
            : error? <p>Error</p>
            : <CircularProgress sx={{ margin: "10% auto", display: "flex", alignItems: "center", justifyContent: "center" }} />}
        </>

    )
}
