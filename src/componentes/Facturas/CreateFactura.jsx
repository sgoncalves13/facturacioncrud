import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import { useParams, Link } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';

import InvoiceFormContainer from './InvoiceForm/InvoiceFormContainer'

import { motion } from 'framer-motion';

import environment from '../../environment.json'

const CreateFactura = () =>{
;
    const windowSize = useWindowSize();

    const[factura, setFactura] = useState(null)

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

    return(
        <motion.div 
        as={motion.div}
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
            <InvoiceFormContainer factura={factura}/>
        </motion.div>
    )
}

export default CreateFactura;