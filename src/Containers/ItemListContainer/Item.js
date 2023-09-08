import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


export default function Item({ producto: { id, title, imagen1, price, description1, categoria, stock, talles } }) {

    return (
        <Card sx={{ maxWidth: { sm: 600 } }}>
            <CardHeader
                title={categoria}
            />
            <CardMedia
                component="img"
                height="220"
                image={imagen1}
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description1}
                </Typography>
                <Typography variant="h6">
                    ${price}
                </Typography>
            </CardContent>
            <CardActions sx={{ margin: "-25px 20px auto", display: "flex", justifyContent: "center" }}>
                <Link to={`producto/${id}`} style={{ textDecoration: 'none', color: "white" }}><Button variant="contained" color="error">Mas detalles</Button></Link>
            </CardActions>
        </Card>
    );
}
