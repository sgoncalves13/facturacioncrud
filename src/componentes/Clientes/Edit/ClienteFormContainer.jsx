import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import ClienteForm from './ClienteForm';
import environment from '../../../environment.json'

import { convertDateToString, convertStringToDate } from '../../../utils/utils';

const DivExterno = styled.div`
    margin-right:15%;
    margin-left:15%;
    margin-top: 5%;
    margin-bottom:5%;
    padding: 5%;
    background-color: white;
    border-radius:30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4), 
                0 12px 30px rgba(0, 0, 0, 0.3),
                inset 0 0 10px rgba(255, 255, 255, 0.1);
    background: linear-gradient(145deg, white, #F0F0F0);
`

const FormHeading = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 3rem;
  span {
    &:before {
      content: '#';
      color: #888eb0;
    }
  }
`;

const initialValuesCliente = {
  padre_id: null,
  inactivo: false,
  descripcion: '',
  tipo_identificador: 0,
  identificador: '',
  moneda_id: 0,
  codigo: '',
  observacion: '',
  direc1: '',
  direc2: '',
  zip: '',
  ciudad_id: 0,
  departamento_id: 0,
  pais_id: 1,
  email: '',
  tipo: 0,
  id: 0,
  usu_ins_id: '',
  fecha_ins: new Date(),
  usu_mod_id: null,
  fecha_mod: null,
  row_version: ''
};

const validationSchemaCliente = Yup.object({
  padre_id: Yup.number().required('required'),
  inactivo: Yup.boolean().required('required'),
  descripcion: Yup.string().required('required'),
  tipo_identificador: Yup.number().required('required'),
  identificador: Yup.string().required('required'),
  moneda_id: Yup.number().required('required'),
  codigo: Yup.string().required('required'),
  observacion: Yup.string().nullable(),
  direc1: Yup.string().required('required'),
  direc2: Yup.string().nullable(),
  zip: Yup.string().required('required'),
  ciudad_id: Yup.number().required('required'),
  departamento_id: Yup.number().required('required'),
  pais_id: Yup.number().required('required'),
  email: Yup.string().email('Invalid email').required('required'),
  tipo: Yup.number().required('required'),
});


function ClienteFormContainer({cliente}) {

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

  let navigate = useNavigate();

  const handleCreate = async (values) => {

    values.tipo_identificador = Number(values.tipo_identificador)

    console.log(values)

    try{
    const response = await fetch(`${environment.baseUrl}/Cliente/CreateCliente`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
      },
      body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const ClienteId = data.value.id;
        alert('Cliente con id: ' + String(ClienteId) + ' creado exitosamente');
        navigate(`/Clientes`);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('Error al crear el cliente' + '. Detalles: ' + errorText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud. Por favor, intenta de nuevo más tarde.');
    }

  };
  
  const handleEdit = async (values) => {

    values.tipo_identificador = Number(values.tipo_identificador)

    console.log(values);
  
    try {
      const response = await fetch(`${environment.baseUrl}/Cliente/UpdateCliente`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        alert('Cliente con id: ' + String(values.id) + ' actualizado exitosamente');
        navigate(`/Clientes/${values.id}`);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('Error al actualizar el cliente con id: ' + String(values.id) + '. Detalles: ' + errorText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <DivExterno>
      <FormHeading>
      {cliente ? (
          <span>Edit {cliente.codigo}</span>
        ) : (
          <span>Crear Cliente</span>
        )}
      </FormHeading>
      <ClienteForm
        validationSchema={validationSchemaCliente}
        initialValues={cliente || initialValuesCliente}
        onSubmit={cliente ? handleEdit : handleCreate}
      />
    </DivExterno>
  );
}

export default ClienteFormContainer;
