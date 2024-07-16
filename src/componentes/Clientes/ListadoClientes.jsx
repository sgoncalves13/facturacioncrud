import React from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ClienteItem from "./ClienteItem";
//import environment from "../../../src/environment.json"

const ClientesList = styled.ul`
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

export const ListadoClientes = ({clientes, isLoading, hasError}) =>{

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (hasError) {
        return <div>Error al obtener los clientes</div>;
    }

        return(
            <div>
            <ClientesList
          as={motion.ul}
          variants={invoiceListVariants}
          initial="hidden"
          animate="visible">
          {clientes.map((cliente) => (
            <motion.li variants={invoiceListItemVariants} key={cliente.id}>
              <ClienteItem idCliente={cliente.id} descripcion={cliente.descripcion} codigo={cliente.codigo} tipo_identificador={cliente.tipo_identificador} identificador={cliente.identificador} status={cliente.inactivo} />
            </motion.li>
          ))}
        </ClientesList>
            </div>
        )
}