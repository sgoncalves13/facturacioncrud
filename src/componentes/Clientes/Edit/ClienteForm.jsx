import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import MUITextfield from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import environment from '../../../environment.json'

import TextField from '../../Facturas/TextField';
import Button from '../Button';
import DatePickerField from '../../Facturas/DatePickerField';

import deviceSize from '../../../styles/breakpoints';

const FieldSet = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
`;

const Legend = styled.legend`
  display: block;
  margin-bottom: 1.5rem;
  font-family: Spartan, sans-serif;
  font-weight: 700;
  color: #7C5DFA;
  letter-spacing: -0.25px;
`;

const FormTextField = styled(TextField)`
  margin-bottom: 1.5rem;
`;

const FormCheckbox = styled.input`
  margin-bottom: 1.5rem;
`;

const AddressFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 24px;
  div:last-child {
    grid-column: 1/3;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: repeat(3, 1fr);
    div:last-child {
      grid-column: auto;
    }
  }
`;

const Divinput = styled.div`
display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 0 24px;
div:last-child {
  grid-column: 1/3;
}
@media screen and (min-width: ${deviceSize.md}) {
  grid-template-columns: repeat(2, 1fr);
  div:last-child {
    grid-column: auto;
  }
}
`;

const InvoiceDatesGrid = styled.div`
  margin-top: 1.5rem;
  input {
    margin-bottom: 1.5rem;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 24px;
    align-items: flex-end;
    div:last-child {
      grid-column: 1/3;
    }
  }
`;

const FormBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  .discard {
    margin-right: auto;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  margin-top:30px;
  margin-bottom: 30px;
`;

const CustomCheckbox = styled(Field)`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: salmon;
    border-color: salmon;
  }
`;

const SelectBox = styled.select`
  background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png") white no-repeat calc(100% - 10px) !important; /* Better placement regardless of input width */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  height: 3rem;
  border-width: 1px;
  border-style: solid;
  background-color: #FFFFFF;
  border-color: ${({ error }) =>
    error ? "#EC5757" : "#DFE3FA"};
  border-radius: 0.25rem;
  padding: 0.9375rem 1.25rem;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0C0E16;
  letter-spacing: -0.25px;
  &:focus {
    outline: none;
    border-color: ${({ error }) =>
    error ? "#EC5757" : "#9277ff"};
  }
  &:placeholder {
    color: rgba(12, 14, 22, 0.4);
  }
`;

const SelectBoxLabel = styled.label`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ error }) =>
    error ? "#EC5757" : "#7e88c3"};
  line-height: 1;
  margin-bottom: 0.625rem;
  span {
    font-size: 0.625rem;
    margin-left: auto;
  }
`;

function InvoiceForm({ initialValues, validationSchema, onSubmit }) {

  let clienteinicial = null

  if (initialValues.padre_id !== null){
    clienteinicial = {
      descripcion: initialValues.descripcion,
      id: initialValues.padre_id
    }
  }
  const [inputValue, setInputValue] = useState(clienteinicial);
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

  let navigate = useNavigate();

  let debounceTimeout;

async function fetchDescripcionesClientes(texto) {

   if (texto === ""){
    setOptions([])
   }
   else{
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
  }
    debounceTimeout = setTimeout(async () => {
      try {
          const response = await fetch(`${environment.baseUrl}/Cliente/GetClienteByDesc?strDesc=${texto}`, {
              headers: {
                  'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
              }
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          console.log(jsonData)
          setOptions(jsonData.value)
      } catch (error) {
          console.error('Error fetching invoices:', error);
      }
    }, 700);
  }
}

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}>
      {({ values, errors, setFieldValue, resetForm, handleChange, touched }) => {
        
        return (
          <Form>
            <FieldSet>
              <Legend>Cliente</Legend>
              <Autocomplete
                  id="free-solo-demo"
                  options={options}
                  value= {inputValue}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onInputChange={(e, newValue) =>{
                    fetchDescripcionesClientes(newValue);
                  }}
                  onChange={(e, newValue) => {
                    if (newValue === null){
                      setInputValue(null);
                      setFieldValue("padre_id", null);
                    }
                    else{
                      setInputValue(newValue)
                      setFieldValue("padre_id", newValue.id)
                    }
                  }}
                  getOptionLabel={(option) => option.descripcion}
                  style={{
                    maxWidth: 500,
                    borderColor: "#DFE3FA",
                    marginBottom: 30,
                    outline: "none", 
                    ":focus": {
                      borderColor: "#9277ff",
                    }
                  }}
                  
                  renderInput={(params) => (
                    <MUITextfield
                      {...params}
                      label="Descripción del padre"
                      error={errors.padre_id && touched.padre_id}
                      helperText={touched.padre_id && errors.padre_id}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              {/* <div>
                <FormTextField
                  label="Padre ID"
                  id="padre_id"
                  name="padre_id"
                  type="number"
                  aria-required="true"
                />
              </div> */}
              <div>
                <FormTextField
                  label="Descripción"
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  placeholder="e.g. Graphic Design Service"
                  aria-required="true"
                />
            </div>
              <FormTextField
                label="Código"
                id="codigo"
                name="codigo"
                type="text"
                aria-required="true"
              />
              <AddressFieldsGrid>
                <div>
                <SelectBoxLabel>Tipo identificador</SelectBoxLabel>
                      <SelectBox
                        id="tipo_identificador"
                        name="tipo_identificador"
                        aria-required="true"
                        onChange={handleChange}
                      >
                        <option value="0">R.I.F.</option>
                        <option value="1">C.I.</option>
                        <option value="2">Otro</option>
                      </SelectBox>
                </div>
                <div>
                  <FormTextField
                    label="Identificador"
                    id="identificador"
                    name="identificador"
                    type="text"
                    aria-required="true"
                  />
                </div>
                <CheckboxContainer>
                  <CustomCheckbox type="checkbox" name="inactivo" />
                  <label>Inactivo</label>
              </CheckboxContainer>
              </AddressFieldsGrid>
              <div>
                      <FormTextField
                        label="Observación"
                        id="observacion"
                        name="observacion"
                        type="text"
                        aria-required="true"
                      />
                    </div>
              <Divinput>
                  <div>
                      <FormTextField
                        label="Dirección 1"
                        id="direc1"
                        name="direc1"
                        type="text"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <FormTextField
                        label="Dirección 2"
                        id="direc2"
                        name="direc2"
                        type="text"
                        aria-required="true"
                      />
                    </div>
              </Divinput>
              <Divinput>
                  <div>
                      <FormTextField
                        label="Email"
                        id="email"
                        name="email"
                        type="text"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <FormTextField
                        label="ZIP"
                        id="zip"
                        name="zip"
                        type="text"
                        aria-required="true"
                      />
                    </div>
              </Divinput>
            </FieldSet>
              <FormBottom>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                      resetForm();
                      if (values.id === 0) {
                        navigate('/Clientes');
                      } else {
                        navigate(`/Clientes/${values.id}`);;
                      }
                    }
                  }>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                    resetForm();
                    setInputValue(clienteinicial);
                  }}>
                  Descartar todos los cambios
                </Button>
                <Button type="submit" className="save-send">
                  Save Changes
                </Button>
              </FormBottom>
          </Form>
        );
      }}
    </Formik>
  );
}

export default InvoiceForm;
