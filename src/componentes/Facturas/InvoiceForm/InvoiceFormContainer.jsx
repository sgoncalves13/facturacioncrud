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

  const [deletedReglones, setDeletedReglones] = useState([]);



  const calcTotal = (items) => {
    if (items.length === 1) {
      return items[0].total;
    }
    const totals = items.map((item) => item.total);
    return totals.reduce((prev, current) => prev + current);
  };

  function reglonesAreDifferent(reglon1, reglon2) {
    const keys = new Set([...Object.keys(reglon1)]);

    for (let key of keys) {
      // console.log(reglon1[key],reglon2[key])
      if (reglon1[key] !== reglon2[key]) {
        return true; 
      }
    }
  
    return false; 
  }

  function CreateMap(reglones){
    let hm = new Map();

    for (let i=0;i<reglones.length;i++){
      hm.set(reglones[i].id, reglones[i])
    }

    return hm
  }

  const handleSubmit = (deletedReglones) =>(values) => {

    let ModifiedNewReglones = [] 

    let map = CreateMap(factura.reglones)

    for (let k = 0; k < values.reglones.length; k++){
      let key = values.reglones[k].id
      if (key !== 0){
        let regloninitstate = map.get(key)

        if (regloninitstate !== undefined && reglonesAreDifferent(values.reglones[k], regloninitstate)){
          ModifiedNewReglones.push(values.reglones[k])
        }
      }else{
        ModifiedNewReglones.push(values.reglones[k])
      }

    }
    console.log("############################")
    console.log("REGLONES QUE CAMBIARON O NUEVOS: ",ModifiedNewReglones)
    console.log("REGLONES VALUES:", values.reglones)
    console.log("REGLONES ELIMINADOS:", deletedReglones)

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
        onSubmit={handleSubmit(deletedReglones)}
        deletedReglones={deletedReglones}
        setDeletedReglones={setDeletedReglones}
      />
    </DivExterno>
  );
}

export default FormContainer;
