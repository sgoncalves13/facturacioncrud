import { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';


const FacturaDetail = () =>{
    const { idFactura } = useParams();

    const[factura, setFactura] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    async function fetchFactura() {
        try {
            const response = await fetch(`https://localhost:7207/GetById?Id=${idFactura}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setFactura(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFactura();
    }, []); 

    
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (hasError) {
        return <div>Error al obtener la factura con id {idFactura}</div>;
    }

    return(
        <div>
            <p>{factura.id}</p>
        </div>
    )

}




export default FacturaDetail;