import React, { useEffect, useState } from "react";
import '../CSS/MenuPrincipal.css'
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

function MenuPrincipal() {

    let navigate = useNavigate();

    function irArticulos() {
        navigate(`/Articulos`);
    }

     const [token, setToken] = useState(null);

     const { instance } = useMsal();
     const activeAccount = instance.getActiveAccount();

     const getIdToken = () => {
        const tokenKey = `${activeAccount.idTokenClaims.oid}.${activeAccount.idTokenClaims.tid}-login.windows.net-idtoken-${activeAccount.idTokenClaims.aud}-${activeAccount.idTokenClaims.tid}---`;
        const idToken = JSON.parse(localStorage.getItem(tokenKey));
        localStorage.setItem('idToken', idToken.secret)
        //console.log(idToken.secret)
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
          <button className="menu-button" onClick={() => navigate(`/Facturas`)}>Facturas</button>
          <button className="menu-button">Opción 3</button>
        </div>
      </div>
    );
}


export default MenuPrincipal;
