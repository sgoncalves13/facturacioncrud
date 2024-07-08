import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
  white-space: nowrap;
  overflow: auto;
  .total-label {
    display: block;
    font-family: Spartan, sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    color: #7E88C3;
    margin-bottom: 0.625rem;
  }
  .amount {
    display: inline-block;
    height: 3rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #0C0E16;
    letter-spacing: -0.25px;
    line-height: 48px;
  }
`;

function InvoiceListItemTotal({ index }) {
  const {
    values: { reglones },
    setFieldValue
  } = useFormikContext();

  useEffect(() => {
    const quantity = reglones[index].cantidad;
    const price = reglones[index].precio_unitario;
    const descuento = reglones[index].descuento;
    const recargo = reglones[index].recargo;
    if (!isNaN(quantity) && !isNaN(price) && !isNaN(descuento) && !isNaN(recargo)) {
      setFieldValue(`reglones[${index}].precio_total`, (quantity * price)-descuento+recargo);
    }
  }, [reglones]);

  return (
    <Wrapper className="total">
      <span className="total-label">Total</span>
      <span className="amount">{reglones[index].precio_total}</span>
    </Wrapper>
  );
}

export default InvoiceListItemTotal;
