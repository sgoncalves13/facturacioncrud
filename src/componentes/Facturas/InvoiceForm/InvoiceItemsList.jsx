import styled from 'styled-components';

import { FieldArray, useFormikContext } from 'formik';

import React, { useEffect, useState } from "react";

import InvoiceListItemTotal from './InvoiceListItemTotal';
import Button from '../Button';
import TextField from '../TextField';

import deviceSize from '../../../styles/breakpoints';

import { ReactComponent as DeleteIcon } from '../../../assets/icon-delete.svg';

const Wrapper = styled.div`
margin-top: 0.5rem;
& > span {
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  color: #777f98;
  margin-bottom: 2.1875rem;
}
.error {
  font-size: 0.625rem;
  font-weight: 600;
  color: #ec5757;
  display: block;
  margin-top: 2rem;
}
.item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 20px;
  gap: 24px 16px;
  align-items: center;
  margin-bottom: 3rem;
  div:first-child {
    grid-column: 1/5;
  }
  div:nth-child(2) input {
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    text-align: center;
  }
  label span {
    display: none;
  }
  input {
    margin-bottom: 0;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;
    margin-bottom: 1.125rem;
    div:first-child {
      grid-column: auto;
    }
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  padding: 0;
  margin-top: 0.9375rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #888EB0;
  &:hover {
    color: #ec5757;
  }
`;

const AddNewItemButton = styled(Button)`
  display: block;
  width: 100%;
  background-color: #EAEAEA;
  color: black;
  &:hover {
    background-color: #CBCBCB;
    color: black;
  }
`;

function InvoiceItemsList({deletedReglones, setDeletedReglones}) {
  const { values, errors } = useFormikContext();

  useEffect(() => {
    setDeletedReglones([]);
  }, [setDeletedReglones]);

  const handleDeleteReglones = (index, arrayHelpers) => {
    const itemToDelete = values.reglones[index];
    if (itemToDelete.id !==0){
      setDeletedReglones([...deletedReglones, itemToDelete]);
    }
    arrayHelpers.remove(index);
  };
  

  return (
    <Wrapper>
      <span>Items List</span>
      <FieldArray
        name="reglones"
        render={(arrayHelpers) => (
          <div>
            {values.reglones.map((item, index) => {
              return (
                <div key={index} className="item-grid">
                  <div className="item-secuencia">
                    <TextField
                      label="Secuencia"
                      id={`item-name-${index}`}
                      name={`reglones[${index}].secuencia`}
                      type="text"
                    />
                  </div>
                  <div className="item-name">
                    <TextField
                      label="Id Articulo"
                      id={`item-name-${index}`}
                      name={`reglones[${index}].art_id`}
                      type="text"
                    />
                  </div>
                  <div className="quantity">
                    <TextField
                      label="Cantidad"
                      id={`qty-${index}`}
                      name={`reglones[${index}].cantidad`}
                      type="text"
                    />
                  </div>
                  <div className="quantity">
                    <TextField
                      label="Unidad Medida Id"
                      id={`qty-${index}`}
                      name={`reglones[${index}].unidadmedida_id`}
                      type="text"
                    />
                  </div>
                  <div className="price">
                    <TextField
                      label="Precio Unidad"
                      id={`price-${index}`}
                      name={`reglones[${index}].precio_unitario`}
                      type="text"
                    />
                  </div>
                  <div className="descuento">
                    <TextField
                      label="Descuento"
                      id={`descuento-${index}`}
                      name={`reglones[${index}].descuento`}
                      type="text"
                    />
                    </div>
                  <div className="recargo">
                    <TextField
                      label="Recargo"
                      id={`recargo-${index}`}
                      name={`reglones[${index}].recargo`}
                      type="text"
                    />
                  </div>
                  <div className="impuesto">
                    <TextField
                      label="Impuesto"
                      id={`impuesto-${index}`}
                      name={`reglones[${index}].impuesto`}
                      type="text"
                    />
                  </div>
                  <InvoiceListItemTotal index={index} />
                  <div>
                    <DeleteButton
                      aria-label="Delete invoice item"
                      type="button"
                      onClick={() => {
                        handleDeleteReglones(index ,arrayHelpers);
                      }}>
                      <DeleteIcon />
                    </DeleteButton>
                  </div>
                </div>
              );
            })}
            <AddNewItemButton
              type="button"
              variant="secondary"
              onClick={() => {
                arrayHelpers.push({
                  factura_id: values.id,
                  secuencia: 0,
                  art_id: 1,
                  cantidad: 0,
                  unidadmedida_id: 0,
                  precio_unitario: 0,
                  descuento: 0,
                  recargo: 0,
                  impuesto: 0,
                  precio_total: 0,
                  id: 0,
                  usu_ins_id:'0',
                  fecha_ins: "2024-06-20T11:06:20.0715369-04:00",
                  usu_mod_id: 'ccisneros@miprofit.com',
                  fecha_mod: "2024-06-20T11:06:20.0715369-04:00",
                  row_version: 'AAAAAAAAP+g='
                });
              }}>
              + Add New Item
            </AddNewItemButton>
            {typeof errors.items === 'string' && <span className="error">{errors.items}</span>}
          </div>
        )}
      />
    </Wrapper>
  );
}

export default InvoiceItemsList;
