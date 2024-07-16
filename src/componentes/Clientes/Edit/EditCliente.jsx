import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import { useParams, Link } from 'react-router-dom';

import useWindowSize from '../../../hooks/useWindowSize';

import ClienteFormContainer from "./ClienteFormContainer";

import { motion } from 'framer-motion';

import environment from '../../../environment.json'

const EditCliente = () =>{
    const { idCliente } = useParams();

    const windowSize = useWindowSize();

    const[cliente, setCliente] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    const wrapperVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: 'tween',
            duration: 0.5,
          },
        },
        exit: { opacity: 0, x: -100 },
      };

    async function fetchCliente() {
        try {
            const response = await fetch(`${environment.baseUrl}/Cliente/GetClienteById?iId=${idCliente}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setCliente(jsonData.value);
            console.log(jsonData.value)
        } catch (error) {
            console.error('Error fetching cliente:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCliente();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (hasError) {
        return <div>Error al obtener el cliente con id {idCliente}</div>;
    }

    return(
        <motion.div 
        as={motion.div}
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
            <ClienteFormContainer cliente={cliente}/>
        </motion.div>
    )
}

export default EditCliente;