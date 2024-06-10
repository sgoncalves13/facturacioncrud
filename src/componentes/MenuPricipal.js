import React, { useEffect, useState } from "react";
import '../CSS/MenuPrincipal.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function MenuPrincipal() {

    let navigate = useNavigate();

    function irArticulos() {
        navigate(`/Articulos`);
    }

     const [token, setToken] = useState(null);

     const getIdToken = () => {
        const tokenKey = 'de3c56ff-2d3f-4b4b-b334-d5e34e62e6b1.0a19c88b-7f2c-4593-908e-8b8a59a1e066-login.windows.net-idtoken-4b00258a-7f41-4167-a35e-fd4e679e5257-0a19c88b-7f2c-4593-908e-8b8a59a1e066---';
        const idToken = JSON.parse(localStorage.getItem(tokenKey));
        localStorage.setItem('idToken', idToken.secret)
        console.log(idToken.secret)
        return idToken.secret;
      };

      useEffect(() => {
        const idToken = getIdToken();
        if (idToken) {
          setToken(idToken);
        } else {
          console.error('Token not found');
        }
      }, []);

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
