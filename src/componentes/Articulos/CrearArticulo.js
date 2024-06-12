import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function CrearArticulo(){
    let navigate = useNavigate();

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    const[descripcion, setDescripcion] = useState('')

    const[descripcionCompra, setDescripcionCompra] = useState('')

    const[descripcionVenta, setDescripcionVenta] = useState('')

    const[puedeComprar, setPuedeComprar] = useState(true)

    const[puedeVender, setPuedeVender] = useState(true)


    const handleSubmit = async (event) => {
        event.preventDefault();

        const articulo = {
            usu_mod_id: null,
            inactivo: false,
            unid_id: 1,
            unid_sec_id: 1,
            descripcion: descripcion,
            descripcion_compra: descripcionCompra,
            descripcion_venta: descripcionVenta,
            puede_comprar: puedeComprar,
            puede_vender: puedeVender,
            ref_interna: 'refinterna',
            tipo: 1,
            tipo_mov: 1
        };
    
        const response = await fetch('https://localhost:7207/api/Articulo/CreateArticulo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
        },
        body: JSON.stringify(articulo),
        });

        if (response.ok) {
            const data = await response.json();
            const articuloId = data.id;
            alert('Artículo creado con ID: '+ String(articuloId));
            navigate('/Articulos');
        } else {
        console.error('Error al crear el artículo');
        }
    };

    return(
    <div>
      <h2>Crear Artículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descripción de compra:
          <input
            type="text"
            name="descripcion_compra"
            value={descripcionCompra}
            onChange={e => setDescripcionCompra(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descripción de venta:
          <input
            type="text"
            name="descripcion_venta"
            value={descripcionVenta}
            onChange={e => setDescripcionVenta(e.target.value)}
          />
        </label>
        <br />
        <label>
          Puede comprar:
          <input
            type="checkbox"
            name="puede_comprar"
            checked={puedeComprar}
            onChange={e => setPuedeComprar(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Puede vender:
          <input
            type="checkbox"
            name="puede_vender"
            checked={puedeVender}
            onChange={e => setPuedeVender(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}



export default CrearArticulo;
