import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import InvoiceForm from './InvoiceForm';
import environment from '../../../environment.json'

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
  cliente_id: null,
  cliente_descripcion: null,
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
  monto_precio_total: 0,
};


const validationSchema = Yup.object({
  cliente_id: Yup.number().nullable().required('required'),
  // cliente_id: Yup.number().required('required'),
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

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

  let navigate = useNavigate();

  const calcTotal = (reglones) => {
    if (reglones.length === 0){
      return 0
    }
    else if (reglones.length === 1) {
      return reglones[0].precio_total;
    }
    const totals = reglones.map((reglon) => reglon.precio_total);
    return totals.reduce((prev, current) => prev + current);
  };

  const handleCreate = async (values) =>{

    values.monto_precio_total = calcTotal(values.reglones)
    try{
    const response = await fetch(`${environment.baseUrl}/Factura/CreateFactura`, {
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
        const articuloId = data.value.id;
        alert('Factura con id: ' + String(articuloId) + ' creada exitosamente');
        navigate(`/Facturas`);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('Error al crear la factura' + '. Detalles: ' + errorText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud. Por favor, intenta de nuevo más tarde.');
    }
  };
  

  function reglonesAreDifferent(reglon1, reglon2) {
    const keys = new Set([...Object.keys(reglon1)]);

    for (let key of keys) {
      //console.log(typeof(reglon1[key]),typeof(reglon2[key]))
      if (String(reglon1[key]) !== String(reglon2[key])) {
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

  const handleSubmit = (deletedReglones) => async (values) => {

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
    // console.log("############################")
    // console.log("REGLONES QUE CAMBIARON O NUEVOS: ",ModifiedNewReglones)
    // console.log("REGLONES VALUES:", values.reglones)
    // console.log("REGLONES ELIMINADOS:", deletedReglones)

    const facturaData = {
      infoFactura: {
        id: values.id,
        usu_ins_id: values.usu_ins_id,
        fecha_ins: values.fecha_ins,
        usu_mod_id: values.usu_mod_id,
        fecha_mod: values.fecha_mod,
        row_version: values.row_version,
        cliente_id: values.cliente_id,
        fecha_registro: values.fecha_registro,
        fecha_emision: values.fecha_emision,
        observacion: values.observacion,
        codigo: values.codigo,
        anulado: values.anulado,
        monto_impuesto: values.monto_impuesto,
        monto_precio_total: calcTotal(values.reglones),
        reglones: ModifiedNewReglones.map(reglon => ({
          id: reglon.id,
          usu_ins_id: reglon.usu_ins_id,
          fecha_ins: reglon.fecha_ins,
          usu_mod_id: reglon.usu_mod_id,
          fecha_mod: reglon.fecha_mod,
          row_version: reglon.row_version,
          factura_id: reglon.factura_id,
          secuencia: reglon.secuencia,
          art_id: reglon.art_id,
          cantidad: reglon.cantidad,
          unidadmedida_id: reglon.unidadmedida_id,
          precio_unitario: reglon.precio_unitario,
          descuento: reglon.descuento,
          recargo: reglon.recargo,
          impuesto: reglon.impuesto,
          precio_total: reglon.precio_total
        }))
      },
      listReglonesDelete: deletedReglones.map(reglon => ({
        id: reglon.id,
        rowVersion: reglon.row_version
      }))
    };

    console.log(facturaData)
  
    try {
      const response = await fetch(`${environment.baseUrl}/Factura/UpdateFactura`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(facturaData),
      });
  
      if (response.ok) {
        console.log('Factura actualizada');
        alert('Factura con id: ' + String(values.id) + ' actualizada exitosamente');
        navigate(`/Facturas/${values.id}`);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('Error al actualizar la factura con id: ' + String(values.id) + '. Detalles: ' + errorText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud. Por favor, intenta de nuevo más tarde.');
    }
  }

  const discard = () => {
    dispatch({ type: CLOSE_DRAWER });
    if (isEditingInvoice) {
      dispatch({ type: CANCEL_INVOICE_EDIT });
    }
  };

  return (
    <DivExterno>
      <FormHeading>
      {factura ? (
          <span>Edit {factura.codigo}</span>
        ) : (
          <span>Crear Factura</span>
        )}
      </FormHeading>
      <InvoiceForm
        validationSchema={validationSchema}
        initialValues={factura || initialValues}
        onSubmit={factura ? handleSubmit(deletedReglones) : handleCreate}
        deletedReglones={deletedReglones}
        setDeletedReglones={setDeletedReglones}
      />
    </DivExterno>
  );
}

export default FormContainer;
