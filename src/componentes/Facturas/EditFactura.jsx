import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import { useParams, Link } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';

import InvoiceFormContainer from './InvoiceForm/InvoiceFormContainer'

const EditFactura = () =>{
    const { idFactura } = useParams();

    const windowSize = useWindowSize();

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
        return <div>Error al obtener las facturas</div>;
    }

    return(
        <div>
            {factura.id}
            {/* <InvoiceFormContainer/> */}
        </div>
    )
}

export default EditFactura;