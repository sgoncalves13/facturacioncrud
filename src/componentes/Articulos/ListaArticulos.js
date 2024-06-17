import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../CSS/ListaArticulos.css'
import PaginationArticulos from "./PaginationArticulos";
import generatePDF from "../../ReportGenerator";
import ExportExcel from "../../ExportExcel";

function Articulos() {

    let navigate = useNavigate();

    const [articulos, setArticulos] = useState([])

    const [count, setCount] = useState(null)

    const [countPages, SetCountPages] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);

    const [quantityPerPage, setQuantityPerPage] = useState(5);

    const [articulosReport, setArticulosReport] = useState([])

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage
    
    async function fetchArticulos(page, quantityPerPage) {
        try {
            const response = await fetch(`https://localhost:7207/api/Articulo/GetAllPage?Page=${page}&QuantityPerPage=${quantityPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setArticulos(jsonData.listArticulos);
            setCount(jsonData.count)
            SetCountPages(jsonData.countPages)
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    useEffect(() => {
        fetchArticulos(currentPage, quantityPerPage);
      }, [currentPage, quantityPerPage]); 

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
            fetchArticulos(currentPage, quantityPerPage);
        } else {
            const errorText = await response.text();
            console.error('Error:', errorText);
            alert('Error al eliminar el articulo con id: ' + String(articulo_del.id) + '. Detalles: ' + errorText);
            fetchArticulos(currentPage, quantityPerPage);
        }
    }
    };

    const irCrearArticulo = () => {
        navigate('/CrearArticulo')
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    

      const increment = () => {
        setQuantityPerPage((prevValue) => prevValue + 5);
      };
    
      const decrement = () => {
        setQuantityPerPage((prevValue) => Math.max(prevValue - 5, 5));
      };  

    async function generateReport() {
        try {
            const response = await fetch(`https://localhost:7207/api/Articulo/GetAll`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            generatePDF(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function generateReportExcel() {
        try {
            const response = await fetch(`https://localhost:7207/api/Articulo/GetAll`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            ExportExcel(jsonData);
            //console.log(jsonData)
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
        
    return (
        <div className="dsad">
        <button onClick={generateReport}>Generar reporte</button>
        <button onClick={generateReportExcel}>Generar reporte excel</button>
        <button onClick={irCrearArticulo}>Crear Artículo</button>

        <button onClick={decrement}>-5</button>
        <input type="text" value={quantityPerPage} readOnly />
        <button onClick={increment}>+5</button>
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
            <div className="Pagination">
            <PaginationArticulos totalPages={countPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
      </div>
    );
}


export default Articulos;
