import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import InvoiceItem from "./InvoiceItem";
//import environment from "../../../src/environment.json"

const InvoicesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const invoiceListItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const invoiceListVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

export const ListadoFacturas= () =>{

    const [facturas, setFacturas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    async function fetchFacturas() {
        try {
            const response = await fetch("https://localhost:7207/GetAllCabecera", {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setFacturas(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFacturas();
    }, []); 

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (hasError) {
        return <div>Error al obtener las facturas</div>;
    }

        return(
            <div>
            <InvoicesList
          as={motion.ul}
          variants={invoiceListVariants}
          initial="hidden"
          animate="visible">
          {facturas.map((factura) => (
            <motion.li variants={invoiceListItemVariants} key={factura.id}>
              <InvoiceItem idFactura={factura.id} Usuario={factura.usu_ins_id} precioTotal={factura.monto_precio_total} fechaIns={factura.fecha_emision} status={factura.anulado} />
            </motion.li>
          ))}
        </InvoicesList>
            </div>
        )
}