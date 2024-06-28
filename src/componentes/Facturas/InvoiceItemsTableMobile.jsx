import styled from 'styled-components';

import { formatPrice } from '../../utils/utils';

const ItemsTable = styled.table`
  width: 100%;
  background-color: #F9FAFE;
  border-radius: 0.5rem;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0); /* Sombras superiores y laterales */
`;

const Body = styled.tbody`
  tr td {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  tr:first-child td {
    padding-top: 1.5rem;
  }
`;

const ItemNameCol = styled.td`
  text-align: left;
`;

const ItemName = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.23px;
  color: black;
  margin-bottom: 0.3125rem;
`;

const ItemQtyPrice = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: #7E88C3;
`;

const ItemTotalCol = styled.td`
  font-size: 0.75rem;
  font-weight: 700;
  text-align: right;
  color: black;
`;

const Footer = styled.tfoot`
  background-color: #494B59;
  color: white;
  tr td {
    padding: 1.5rem;
  }
`;

const TotalLabel = styled.td`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
`;

const InvoiceTotal = styled.td`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.42px;
  text-align: right;
`;

  const Sr_only = styled.div`
      border: 0px;
      clip: rect(0px, 0px, 0px, 0px);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0px;
      position: absolute;
      width: 1px;
      white-space: nowrap;
      overflow-wrap: normal;
`;



function InvoiceItemsTableMobile({ anulado, id, renglones, total }) {
  return (
    <ItemsTable>
      <thead>
        <tr>
          <th>
            <Sr_only>Item</Sr_only>
          </th>
          <th>
            <Sr_only>Total</Sr_only>
          </th>
        </tr>
      </thead>
      <Body>
        {renglones.map(({ art_id, precio_unitario, cantidad, precio_total}, index) => {
          return (
            <tr key={index + id}>
              <ItemNameCol>
                <ItemName>{art_id}</ItemName>
                <ItemQtyPrice>{`${formatPrice(precio_unitario)} X ${cantidad}`}</ItemQtyPrice>
              </ItemNameCol>
              <ItemTotalCol>{formatPrice(precio_total)}</ItemTotalCol>
            </tr>
          );
        })}
      </Body>
      <Footer>
        <tr>
          <TotalLabel>{anulado === 'true' ? 'Precio Final' : 'Precio Total'}</TotalLabel>
          <InvoiceTotal>{formatPrice(total)}</InvoiceTotal>
        </tr>
      </Footer>
    </ItemsTable>
  );
}

export default InvoiceItemsTableMobile;
