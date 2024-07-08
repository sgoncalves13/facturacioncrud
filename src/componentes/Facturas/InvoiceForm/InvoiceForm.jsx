import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import TextField from '../TextField';
import Button from '../Button';
import InvoiceItemsList from './InvoiceItemsList';
import DatePickerField from '../DatePickerField';

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

function InvoiceForm({ initialValues, validationSchema, onSubmit, deletedReglones, setDeletedReglones }) {
  let navigate = useNavigate()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}>
      {({ values, errors, setFieldValue, resetForm }) => {
        return (
          <Form>
            <FieldSet>
              <Legend>Factura</Legend>
              <div>
                <FormTextField
                  label="ID Cliente"
                  id="cliente_id"
                  name="cliente_id"
                  type="number"
                  aria-required="true"
                />
              </div>
              <InvoiceDatesGrid>
              <div>
                <DatePickerField
                  label="Fecha Registro"
                  name="createdAt"
                  id="createdAt"
                  value={values.fecha_registro}
                  selected={values.fecha_registro}
                  onChange={setFieldValue}
                  error={errors.fecha_registro}
                  disabled={values.status === 'pending'}
                />
              </div>
              <div>
                <DatePickerField
                  label="Fecha Emision"
                  name="paymentDue"
                  id="paymentDue"
                  selected={values.fecha_emision}
                  value={values.fecha_emision}
                  onChange={setFieldValue}
                  error={errors.fecha_emision}
                />
              </div>
              <div>
                <FormTextField
                  label="Observación"
                  id="observacion"
                  name="observacion"
                  type="text"
                  placeholder="e.g. Graphic Design Service"
                  aria-required="true"
                />
              </div>
            </InvoiceDatesGrid>
              <FormTextField
                label="Código"
                id="codigo"
                name="codigo"
                type="text"
                aria-required="true"
              />
              <AddressFieldsGrid>
              <CheckboxContainer>
                  <CustomCheckbox type="checkbox" name="anulado" />
                  <label>Anulado</label>
              </CheckboxContainer>
                <div>
                  <FormTextField
                    label="Monto Impuesto"
                    id="monto_impuesto"
                    name="monto_impuesto"
                    type="number"
                    aria-required="true"
                  />
                </div>
                <div>
                  <FormTextField
                    label="Monto Precio Total"
                    id="monto_precio_total"
                    name="monto_precio_total"
                    type="number"
                    aria-required="true"
                  />
                </div>
              </AddressFieldsGrid>
            </FieldSet>
            <InvoiceItemsList deletedReglones={deletedReglones} setDeletedReglones={setDeletedReglones}/>
              <FormBottom>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                      resetForm();
                      if (values.id === 0) {
                        navigate('/Facturas');
                      } else {
                        navigate(`/Facturas/${values.id}`);;
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
                    setDeletedReglones([]);
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
