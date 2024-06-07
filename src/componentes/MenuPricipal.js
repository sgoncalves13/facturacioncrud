import React from 'react';
import '../CSS/MenuPrincipal.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function MenuPrincipal() {

    let navigate = useNavigate();

    function irArticulos() {
        navigate(`/Articulos`);
    }

    return (
        <div className="menu">
        <h1 className="menu-title">Menú Principal</h1>
        <div className="menu-buttons">
          <button className="menu-button" onClick={irArticulos}>Articulos</button>
          <button className="menu-button">Opción 2</button>
          <button className="menu-button">Opción 3</button>
        </div>
      </div>
    );
}


export default MenuPrincipal;
