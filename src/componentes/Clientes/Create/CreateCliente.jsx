import React, { useEffect, useState } from "react";

import useWindowSize from '../../../hooks/useWindowSize';

import { motion } from 'framer-motion';

import ClienteFormContainer from "../Edit/ClienteFormContainer";

const CreateCliente = () =>{
;
    const windowSize = useWindowSize();

    const[cliente, setCliente] = useState(null)

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
            <ClienteFormContainer cliente={cliente}/>
        </motion.div>
    )
}

export default CreateCliente;