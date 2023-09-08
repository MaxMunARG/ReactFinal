import React, { useState } from 'react';
import { useCartContext } from '../Context/CartContext';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from '@mui/material';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { db } from '../Firebase/Firebase';
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Alert } from "@mui/material";
import { Link } from 'react-router-dom';
import DialogContentText from '@mui/material/DialogContentText';

const initialState = {
    name: "",
    address: "",
    email: "",
    email2: "",
    telephone: "",
};

export const CartForm = () => {
    const { cart, totalPrice, reset } = useCartContext()
    const [open, setOpen] = useState(false);
    const [finish, setFinish] = useState(false);
    const [complete, setComplete] = useState(false)
    const [buyer, setBuyer] = useState(initialState);
    const [idVenta, setIdVenta] = useState("");
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    const validateEmail = (email) =>
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const finalizarCompra = (buyer, items) => {
        setComplete(true);
        setFinish(false);
        const ventasCollection = collection(db, "ventas");
        addDoc(ventasCollection, {
            buyer,
            items: items,
            date: serverTimestamp(),
            total: totalPrice()
        })
            .then(res => {
                setIdVenta(res.id);
                items.forEach(producto => {
                    actStock(producto, producto.size)
                });
            })

    }
    const actStock = (producto, talle) => {
        const refDoc = doc(db, "products", producto.id);
        getDoc(refDoc)
            .then((data) => {
                let updateStock = data;
                let tallesupd = updateStock.get("talles");
                tallesupd[talle] = tallesupd[talle] - producto.quantity;
                updateDoc(refDoc, { talles: (tallesupd) });
            })
            .catch(() => {
                console.log("error leer articulo");
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setFinish(true)
    };

    const handlerOnChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setOpen(false);
        if (complete) {
            reset();
        }
    };

    const handleConfirm = () => {
        if (buyer.address === "" || buyer.name === "" || buyer.email === "" || buyer.email2 === "") {
            setAlert(true);
            return;
        } else if ((!validateEmail(buyer.email))) {
            setAlert2(true);
            return;
        } else if (buyer.email !== buyer.email2) {
            setAlert3(true);
            return;
        } finalizarCompra(buyer, cart)
    }

    return (
        <div>
            <Button
                sx={{ margin: "15px" }}
                variant="contained" color="success"
                onClick={handleClickOpen}
            >
                Finalizar Compra
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>
                    Formulario de Compra
                </DialogTitle>
                {alert ? (
                    <Alert variant="filled" severity="error">
                        Nombre, Dirección y Email son datos obligatorios
                    </Alert>
                ) :
                    alert3 ? (
                        <Alert variant="filled" severity="error">
                            Los campos email no coinciden
                        </Alert>
                    ) :
                        alert2 ? (
                            <Alert variant="filled" severity="error">
                                No has ingresado un correo valido
                            </Alert>
                        ) :
                            complete ? (
                                <Alert variant="filled" severity="success">
                                    Compra realizada con exito su id es: <p>{idVenta}</p>
                                </Alert>
                            ) : <DialogContentText sx={{ textAlign: "center" }}>Por favor ingrese los datos para confirmar la compra</DialogContentText>}
                <DialogContent>
                    <TextField
                        autoFocus
                        onFocus={() => setAlert(false)}
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre y apellido"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handlerOnChange}
                    />
                    <TextField
                        autoFocus
                        onFocus={() => setAlert(false)}
                        margin="dense"
                        id="address"
                        name="address"
                        label="Direccion"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handlerOnChange}
                    />
                    <TextField
                        autoFocus
                        onFocus={() => setAlert(false)}
                        margin="dense"
                        id="telephone"
                        name="telephone"
                        label="Telefono"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={handlerOnChange}
                    />
                    <TextField
                        autoFocus
                        onFocus={() =>{setAlert(false)
                                       setAlert2(false)
                                       setAlert3(false)  }
                        }
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        helperText="Se enviara la informacion a este correo"
                        onChange={handlerOnChange}
                    />
                    <TextField
                        autoFocus
                        onFocus={() => {setAlert(false)
                                        setAlert3(false)  }
                        }
                        margin="dense"
                        id="email2"
                        name="email2"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        helperText="confirme su email"
                        onChange={handlerOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        {complete ? 'CERRAR' : 'CANCELAR'}
                    </Button>
                    {finish ? <Button variant="contained" color="success" onClick={handleConfirm}>CONFIRMAR

                    </Button> :
                        <Link to={`/`} style={{ textDecoration: 'none', margin: "0px 10px" }}>
                            <Button onClick={handleClose} variant="contained" color="primary"> Seguir Comprando</Button>
                        </Link>}
                </DialogActions>
            </Dialog>
        </div>
    );
}





