import styled from 'styled-components';

import { formatPrice } from '../../utils/utils';

const Table = styled.table`
  width: 100%;
  background-color: #F9FAFE;
  border-radius: 0.5rem;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0); /* Sombras superiores y laterales */
`;


const TableHead = styled.th`
  padding: 2rem;
  color: #7E88C3;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.23px;
`;

const ItemNameHead = styled(TableHead)`
  text-align: left;
`;

const ItemQtyHead = styled(TableHead)`
  text-align: center;
`;

const ItemPriceHead = styled(TableHead)`
  text-align: right;
`;

const ItemDescuentoHead = styled(TableHead)`
  text-align: right;
`;

const ItemRecargoHead = styled(TableHead)`
  text-align: right;
`;

const ItemTotalHead = styled(TableHead)`
  text-align: right;
`;

const Body = styled.tbody`
  tr td {
    padding: 0 2rem 2rem 2rem;
    font-weight: 700;
    font-size: 0.75rem;
  }
`;

const ItemNameCol = styled.td`
  color: black;
`;

const ItemQtyCol = styled.td`
  text-align: center;
`;

const ItemPriceCol = styled.td`
  text-align: right;
`;

const ItemDescuentoCol = styled.td`
  text-align: right;
`;

const ItemRecargoCol = styled.td`
  text-align: right;
`;

const ItemTotalCol = styled(ItemNameCol)`
  text-align: right;
  color: black;
`;

const Footer = styled.tfoot`
  background-color: #494B59;
  color: white;
  tr td {
    padding: 1.5rem 2rem;
  }
`;

const TotalLabel = styled.td`
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
`;

const InvoiceTotal = styled.td`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.42px;
  text-align: right;
`;

function InvoiceItemsTable({ anulado, id, renglones, total }) {
  return (
    <Table>
      <thead>
        <tr>
          <ItemNameHead>Id Articulo</ItemNameHead>
          <ItemQtyHead>Cantidad</ItemQtyHead>
          <ItemPriceHead>Precio Unitario</ItemPriceHead>
          <ItemDescuentoHead>Descuento</ItemDescuentoHead>
          <ItemRecargoHead>Recargo</ItemRecargoHead>
          <ItemTotalHead>Precio Total</ItemTotalHead>
        </tr>
      </thead>
      <Body>
        {renglones.map(({ art_id, precio_unitario, cantidad, descuento, recargo, precio_total }, index) => {
          return (
            <tr key={index + id}>
              <ItemNameCol>{art_id}</ItemNameCol>
              <ItemQtyCol>{cantidad}</ItemQtyCol>
              <ItemPriceCol>{formatPrice(precio_unitario)}</ItemPriceCol>
              <ItemDescuentoCol>{formatPrice(descuento)}</ItemDescuentoCol>
              <ItemRecargoCol>{formatPrice(recargo)}</ItemRecargoCol>
              <ItemTotalCol>{formatPrice(precio_total)}</ItemTotalCol>
            </tr>
          );
        })}
      </Body>
      <Footer>
        <tr>
          <TotalLabel>{anulado === 'true' ? 'Precio Final' : 'Precio Total'}</TotalLabel>
          <InvoiceTotal colSpan={5}>{formatPrice(total)}</InvoiceTotal>
        </tr>
      </Footer>
    </Table>
  );
}

export default InvoiceItemsTable;
