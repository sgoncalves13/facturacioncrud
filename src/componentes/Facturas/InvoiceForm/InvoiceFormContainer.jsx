import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';


// import { CLOSE_DRAWER, ADD_INVOICE, UPDATE_INVOICE, CANCEL_INVOICE_EDIT } from '../../actions';

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

const initialValues = {
  id: '',
  status: '',
  clientName: '',
  clientEmail: '',
  createdAt: new Date(),
  paymentDue: new Date(),
  description: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  items: [],
  total: 0
};

const initialValues2 = {
  cliente_id: 0,
  fecha_registro: new Date(),
  fecha_emision: new Date(),
  observacion: '',
  codigo: '',
  anulado: false,
  monto_impuesto: 0,
  id: 0,
  usu_ins_id: '',
  fecha_ins: new Date(),
  usu_mod_id: null,
  fecha_mod: null,
  row_version: null,
  reglones: [],
  monto_precio_total: 0
};


const validationSchema = Yup.object({
  cliente_id: Yup.number().required('require'),
  fecha_registro: Yup.date().required('required'),
  fecha_emision: Yup.date().required('required'),
  observacion: Yup.string().required('required'),
  codigo: Yup.string().required('required'),
  anulado: Yup.boolean().required('required'),
  monto_impuesto:Yup.number().required('required'),
  monto_precio_total:Yup.number().required('required'),
  reglones: Yup.array()
    .of(
      Yup.object().shape({
        factura_id: Yup.number().required(),
        secuencia: Yup.number().required(),
        art_id: Yup.number().required(),
        cantidad: Yup.number().required(),
        unidadmedida_id: Yup.number().required(),
        precio_unitario: Yup.number().required(),
        descuento: Yup.number().required(),
        recargo: Yup.number().required(),
        impuesto: Yup.number().required(),
        precio_total: Yup.number().required(),
        id: Yup.number().required(),
        usu_ins_id: Yup.string().required(),
        fecha_ins: Yup.date().required(),
        usu_mod_id: Yup.string().nullable(),
        fecha_mod: Yup.date().nullable(),
        row_version: Yup.string().required()
      })
    )
});

function FormContainer({factura}) {



  const calcTotal = (items) => {
    if (items.length === 1) {
      return items[0].total;
    }
    const totals = items.map((item) => item.total);
    return totals.reduce((prev, current) => prev + current);
  };

  const onSubmit = (values) => {

    console.log(values)
    // const total = calcTotal(values.items);
    // const createdAt = convertDateToString(values.createdAt);
    // const paymentDue = convertDateToString(values.paymentDue);
    // if (!values.status) {
    //   const id = nanoid(6);
    //   dispatch({
    //     type: ADD_INVOICE,
    //     payload: { ...values, status: 'pending', id, total, createdAt, paymentDue }
    //   });
    // } else if (values.status === 'draft') {
    //   dispatch({
    //     type: UPDATE_INVOICE,
    //     payload: { ...values, status: 'pending', total, createdAt, paymentDue }
    //   });
    // } else if (values.status === 'pending') {
    //   dispatch({
    //     type: UPDATE_INVOICE,
    //     payload: { ...values, total, createdAt, paymentDue }
    //   });
    // }
    // dispatch({ type: CLOSE_DRAWER });
  };

  const saveInvoice = (values) => {
    const total = calcTotal(values.items);
    const createdAt = convertStringToDate(values.createdAt);
    const paymentDue = convertStringToDate(values.paymentDue);
    if (values.status === 'draft') {
      dispatch({
        type: UPDATE_INVOICE,
        payload: { ...values, total, createdAt, paymentDue }
      });
    } else {
      const id = nanoid(6);
      dispatch({
        type: ADD_INVOICE,
        payload: { ...values, status: 'draft', id, total, createdAt, paymentDue }
      });
    }
    dispatch({ type: CLOSE_DRAWER });
  };

  const discard = () => {
    dispatch({ type: CLOSE_DRAWER });
    if (isEditingInvoice) {
      dispatch({ type: CANCEL_INVOICE_EDIT });
    }
  };

  return (
    <DivExterno>
      <FormHeading>
        Edit <span>{factura.id}</span>
      </FormHeading>
      <InvoiceForm
        validationSchema={validationSchema}
        initialValues={factura || initialValues}
        discard={discard}
        saveInvoice={saveInvoice}
        onSubmit={onSubmit}
        renglones={factura.reglones}
      />
    </DivExterno>
  );
}

export default FormContainer;
