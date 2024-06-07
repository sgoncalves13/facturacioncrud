import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MenuPrincipal from "./componentes/MenuPricipal";
import Articulos from "./componentes/Articulos/ListaArticulos";
import EditarArticulo from "./componentes/Articulos/EditarArticulo";
import CrearArticulo from "./componentes/Articulos/CrearArticulo";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MenuPrincipal/>} />
          <Route path="/Articulos" element={<Articulos/>} />
          <Route path="/CrearArticulo" element={<CrearArticulo/>} />
          <Route path="/EditarArticulo/:id_articulo" element={<EditarArticulo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
