import './App.css';
import NavBar from './components/Header/NavBar';
import ItemListContainer from './Containers/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './Containers/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart } from './Containers/Cart/Cart';
import { ListBuy } from './Containers/Cart/ListBuy';
import CartContextProvider from './Context/CartContext';



const  App = () => {

  const titulo= "Tienda Deportiva al mejor precio";  

  return (
    <>
    <BrowserRouter>
          <CartContextProvider>
            <NavBar titulo={titulo}/>
              <Routes>
                  <Route path="/" element={<ItemListContainer greeting={"Bienvenidos"}/>} />
                  <Route path="categoria/:categoria" element={<ItemListContainer />} />
                  <Route path="producto/:id" element={<ItemDetailContainer />}/>
                  <Route path="categoria/:categoria/producto/:id" element={<ItemDetailContainer />}/> 
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/vercompra" element={<ListBuy/>}/>        
              </Routes>
          </CartContextProvider>        
    </BrowserRouter>
    </>
  );
}

export default App;
