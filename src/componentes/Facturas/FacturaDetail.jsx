import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import { useParams, Link, useNavigate } from 'react-router-dom';

import MainContainer from '../../layout/MainContainer';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import InvoiceInfo from './InvoiceInfo';
import InvoiceItemsTableMobile from './InvoiceItemsTableMobile';
import InvoiceItemsTable from './InvoiceItemsTable';
import Button from './Button';
import DeleteInvoiceModal from './DeleteInvoiceModal';

import { formatDate } from '../../utils/utils';
import useWindowSize from '../../hooks/useWindowSize';
import deviceSize from '../../styles/breakpoints';

import IconArrowLeft from '../../assets/icon-arrow-left.svg';

import environment from '../../environment.json'


const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  text-decoration: none;
  color: black;
  margin-bottom: 2rem;
  img {
    margin-right: 1.4375rem;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FBFBFB;
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  border: 1px solid #C2C2C2;
  box-shadow: 0px 15px 20px -10px rgba(72, 84, 159, 0.2);
  @media screen and (min-width: ${deviceSize.md}) {
    justify-content: flex-start;
    gap: 16px;
  }
`;

const StatusLbl = styled.p`
  margin-top:0;
  margin-bottom:0;
  font-size: 0.75rem;
  color: #757780;
  font-weight: 500;
`;

const InvoiceActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FBFBFB;
  padding: 1.3125rem 1.5rem;
  @media screen and (min-width: ${deviceSize.md}) {
    position: static;
    margin-left: auto;
    padding: 0;
  }
`;

const DetailsCard = styled.main`
  background-color: #FBFBFB;
  border-radius: 0.5rem;
  padding: 1.5rem;
  color: #757780;
  line-height: 1.6;
  border: 1px solid #C2C2C2;
  box-shadow: 0px 15px 20px -10px rgba(72, 84, 159, 0.2);
  margin-bottom: 2.8125rem;
`;

const DetailsCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'nameid nameid'
    'senderaddress senderaddress'
    'invoicedates clientnameaddress'
    'clientemail clientemail';
  gap: 30px 20px;
  margin-bottom: 2.5rem;
  .invoice-id-name {
    grid-area: nameid;
  }
  .sender-address {
    grid-area: senderaddress;
  }
  .invoice-dates {
    grid-area: invoicedates;
  }
  .client-email {
    grid-area: clientemail;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'nameid nameid senderaddress'
      'invoicedates clientnameaddress clientemail';
  }
`;

const InvoiceIdName = styled.div`
  display: block;
`;

const InvoiceID = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: black;
  letter-spacing: -0.23px;
  margin-bottom: 0.25rem;
  margin: 0;
  &:before {
    content: '#';
    color: #7e88c3;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    font-size: 1rem;
  }
`;

const InvoiceName = styled.h1`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.25rem 0;
`;

const SenderAddress = styled.address`
  font-size: 0.6875rem;
  font-style: normal;
  letter-spacing: -0.23px;
  @media screen and (min-width: ${deviceSize.md}) {
    text-align: right;
  }
`;


const FacturaDetail = () =>{
    const { idFactura } = useParams();

    const windowSize = useWindowSize();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const[factura, setFactura] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    let navigate = useNavigate();

    const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    async function fetchFactura() {
        try {
            const response = await fetch(`${environment.baseUrl}/Factura/GetById?Id=${idFactura}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setFactura(jsonData.value);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFactura();
    }, []); 

    const irEditar = (idFactura) =>{
        navigate(`/Facturas/Edit/${idFactura}`)
    }
    
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (hasError) {
        return <div>Error al obtener la factura con id {idFactura}</div>;
    }

    return(
            <MainContainer>
                <BackButton to="/Facturas">
                    <img src={IconArrowLeft} alt="" />
                    Go back
                </BackButton>
                {factura && (
                    <>
                    <Header>
                    <StatusLbl>Status</StatusLbl>
                    <InvoiceStatusBadge status={factura.anulado.toString()} />
                        <InvoiceActions>
                            <Button
                            variant="secondary"
                            aria-label="Edit Invoice"
                            mode = "edit"
                            onClick={() => irEditar(factura.id)}
                            >
                            Edit
                            </Button>
                            <Button
                                variant="warning"
                                aria-label="Delete Invoice"
                                mode = "delete"
                                onClick={() => setIsDeleteModalOpen(true)}>
                                Delete
                            </Button>
                        </InvoiceActions>
                    </Header>
                    <DetailsCard>
                        <DetailsCardGrid>
                        <InvoiceIdName className="invoice-id-name">
                            <InvoiceID>{factura.codigo}</InvoiceID>
                            <InvoiceName>Observación: {factura.observacion}</InvoiceName>
                        </InvoiceIdName>
                        <div className="invoice-dates">
                            <InvoiceInfo
                            className="created-at"
                            label="Fecha Emision"
                            value={formatDate(factura.fecha_emision)}
                            />
                            <InvoiceInfo
                            className="payment-due"
                            label="Fecha Registro"
                            value={formatDate(factura.fecha_registro)}
                            />
                        </div>
                        <div className="client-name-address">
                            <InvoiceInfo className="client-name" label="Usuario Inscribir" value={factura.usu_ins_id} />
                        </div>
                        <InvoiceInfo className="client-email" label="Usuario Modificar" value={factura.usu_mod_id} />
                        </DetailsCardGrid>
                        {windowSize.width <= 576 ? (
                        <InvoiceItemsTableMobile
                            anulado={factura.anulado}
                            id={factura.id}
                            renglones={factura.reglones}
                            total={factura.monto_precio_total}
                        />
                        ) : (
                        <InvoiceItemsTable
                            anulado={factura.anulado}
                            id={factura.id}
                            renglones={factura.reglones}
                            total={factura.monto_precio_total}
                        />
                        )}
                    </DetailsCard>
                    </>
                )}
                {factura && (
                    <DeleteInvoiceModal
                    id={factura.id}
                    facturaCodigo = {factura.codigo}
                    rowversion = {factura.row_version}
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    />
                )}
            </MainContainer>
    )

}




export default FacturaDetail;