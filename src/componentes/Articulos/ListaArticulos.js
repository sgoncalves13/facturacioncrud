import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../../CSS/ListaArticulos.css'

function Articulos() {

    let navigate = useNavigate();

    const [articulos, setArticulos] = useState([])

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    async function fetchData() {
        try {
            const response = await fetch('https://localhost:7207/api/Articulo/GetAll', {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setArticulos(jsonData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    

    useEffect(() => {
        fetchData();
      }, []); 

    const handleEdit = (articulo_editar) => {
        localStorage.setItem("articulo_editar", JSON.stringify(articulo_editar))
        navigate(`/EditarArticulo/${articulo_editar.id}`);
    };    

    const handleDelete = async (articulo_del) => {
        // Mostrar confirmación al usuario
        const isConfirmed = window.confirm('¿Está seguro de que desea eliminar este artículo?');

        console.log(articulo_del)

        const articulo_delete = {
            id: articulo_del.id,
            rowVersion: articulo_del.row_version
        }
        console.log(articulo_delete)
        if (isConfirmed) {
        const response = await fetch(`https://localhost:7207/api/Articulo/DeleteArticulo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
            },
            body: JSON.stringify(articulo_delete),
        });

        if (response.ok) {
            alert('Artículo con id: ' +String(articulo_del.id)+ ' eliminado exitosamente');
            fetchData();
        } else {
            console.error('Error al eliminar el artículo');
        }
    }
    };

    const irCrearArticulo = () => {
        navigate('/CrearArticulo')
    }
      

    return (
        <div className="dsad">
        <button onClick={irCrearArticulo}>Crear Artículo</button>
        <div className="Listado_Articulos">
            {articulos.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha de Inscripción</th>
                            <th>Descripción</th>
                            <th>Inactivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map((articulo) => (
                            <tr key={articulo.id}>
                                <td>{articulo.id}</td>
                                <td>{articulo.fecha_ins}</td>
                                <td>{articulo.descripcion}</td>
                                <td>{articulo.inactivo === false ? (<input type="checkbox" disabled/>) : (<input type="checkbox" disabled checked/>)}</td>
                                <td>
                                    <button onClick={() => handleEdit(articulo)}>Editar</button>
                                    <button onClick={() => handleDelete(articulo)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
      </div>
    );
}


export default Articulos;
