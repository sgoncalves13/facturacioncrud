import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ClienteStatusBadge from "./ClienteStatusBadge";

import deviceSize from '../../styles/breakpoints';
import { formatDate, formatPrice } from '../../utils/utils';

import { ReactComponent as IconArrowRight } from '../../assets/icon-arrow-right.svg';

export const tipo_identificador_nombre = (tipo_identificador) =>{
    if (tipo_identificador === 0){
        return "R.I.F."
    }
    else if (tipo_identificador === 1){
        return "C.I."
    }
    else{
        return "Otro"
    }
}

const Wrapper = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  background-color: #FBFBFB;
  color: #5F5F5F;
  border-radius: 0.5rem;
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid #C2C2C2;
  box-shadow: 0px 15px 20px -10px rgba(72, 84, 159, 0.2);
  text-decoration: none;
  margin-bottom: 1rem;
  &:hover {
    border-color: purple;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: 103px 151px 110px 142px 144px 26px;
    padding: 1.5rem;
    align-items: center;
  }
`;

const ClienteCod = styled.span`
  display: block;
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 0.75rem;
  font-weight: 700;
  color: black;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  &:before {
    content: '#';
    color: #7e88c3;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    margin-bottom: 0;
    position: static;
  }
`;

const ClienteTypeIden = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: right;
  margin-bottom: 1.5rem;
  @media screen and (min-width: ${deviceSize.md}) {
    margin-bottom: 0;
    text-align: left;
    position: static;
  }
`;

const ClienteDesc = styled(ClienteTypeIden)`
  position: static;
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  grid-column: 1/3;
  @media screen and (min-width: ${deviceSize.md}) {
    margin-bottom: 0;
    grid-column: auto;
  }
`;

const ClienteIdentificador = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.8px;
  color: black;
  @media screen and (min-width: ${deviceSize.md}) {
    text-align: right;
  }
`;

const ArrowIcon = styled.div`
  display: none;
  text-align: right;
  @media screen and (min-width: ${deviceSize.md}) {
    display: block;
  }
`;

function ClienteItem({ idCliente, codigo, descripcion, tipo_identificador, identificador, status}) {
  

  return (
    <Wrapper to={`/Clientes/${idCliente}`} aria-label={`${identificador} - View Cliente`}>
      <ClienteCod>{codigo}</ClienteCod>
      <ClienteDesc>{descripcion}</ClienteDesc>
      <ClienteTypeIden>{tipo_identificador_nombre(tipo_identificador)}</ClienteTypeIden>
      <ClienteIdentificador>{identificador}</ClienteIdentificador>
      <ClienteStatusBadge status={status.toString()} />
      <ArrowIcon>
        <IconArrowRight />
      </ArrowIcon>
    </Wrapper>
  );
}

export default ClienteItem;
