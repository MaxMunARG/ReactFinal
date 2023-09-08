import React from "react";
import logojordan from "../../assets/logojordan.png";
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CartWidget from "./CartWidget";
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const pages = [
    { id: 0, nombre: 'Zapatillas', ruta: "/categoria/Zapatillas" },
    { id: 1, nombre: 'Remeras', ruta: "/categoria/Remeras" },
    { id: 2, nombre: 'Buzos', ruta: "/categoria/Buzos" },
]

export default function NavBar({ titulo }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar sx={{ background: "white" }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton>
                        <Link to="/"><img style={styles.img} src={logojordan} alt="jordan" title="HOME" /></Link>
                    </IconButton>
                    <Typography
                        sx={{
                            display: { xs: "none", md: "flex" }, color: "black", fontSize: "1.5rem",
                            textAlign: "center",
                            marginLeft: "10%",
                            marginRight: "10%",
                        }}>
                        {titulo}
                    </Typography>
                    <Box sx={{ justifyContent: { xs: "flex-end" }, flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="default"
                        >
                            <Typography>Menu</Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id}  onClick={handleCloseNavMenu}>
                                    <Link to={page.ruta} style={styles.link}>{page.nombre}</Link>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/vercompra" style={styles.link}>Ver Compra</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{justifyContent:{ xs: "flex-end" }, flexGrow: 1,  alignItems:"center", display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Link key={page.id} to={page.ruta} style={styles.link}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: "black", display: "block" }}>
                                        {page.nombre}
                                </Button>      
                            </Link>
                        ))}
                        <Link to="/vercompra" style={styles.link}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{  color: "black", display: "block", fontSize: "0.6rem" }}>
                                    Ver Compra
                            </Button>      
                        </Link>
                    </Box>
                    <Link to="/cart"><CartWidget /></Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}



const styles = {
    root: {
        flexGrow: 1,
    },

    appBar: {

        borderBottom: "1px solid",
        borderBottomColor: "black",
        backgroundColor: "white",
        boxShadow: "none",
        color: "black",
    },
  

    banner: {
        fontSize: "1.5rem",
        textAlign: "center",
        marginLeft: "10%",
        marginRight: "10%",
    },
    img: {
        maxWidth: 150,
        height: "2rem",
    },

    link: {
        
        color: "black",
        textDecoration: "none",
    },
}
