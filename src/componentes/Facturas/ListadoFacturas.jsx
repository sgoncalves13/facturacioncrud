import React from "react";
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

export const ListadoFacturas= ({facturas, isLoading, hasError}) =>{

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
              <InvoiceItem idFactura={factura.id} codigoFactura={factura.codigo} Usuario={factura.usu_ins_id} precioTotal={factura.monto_precio_total} fechaIns={factura.fecha_emision} status={factura.anulado} />
            </motion.li>
          ))}
        </InvoicesList>
            </div>
        )
}