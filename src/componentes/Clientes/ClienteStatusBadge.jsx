import styled from 'styled-components';

const statusColor = (anulado)=> {
  if (anulado === "true"){
    return "#F44E4E"
  }
  else{
    return "#33D69F"
  }
}

const statusText = (anulado) => {
  if (anulado === "true"){
    return "Inactivo"
  }
  else{
     return "Activo"
  }
}

const ClienteStatus = styled.div`
  text-align: right;
  & > div {
    display: inline-flex;
    position: relative;
    width: 6.5rem;
    height: 2.5rem;
    border-radius: 0.375rem;
    z-index: 1;
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      inset: 0;
      border-radius: 0.375rem;
      background-color: ${({ status }) => statusColor(status)};
      opacity: 0.05;
    }
  }
`;

const ClienteStatusText = styled.div`
  margin: auto;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ status }) => statusColor(status)};
  letter-spacing: -0.25px;
  text-transform: capitalize;
  &:before {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ status }) => statusColor(status)};
    margin-right: 0.5rem;
  }
`;

function ClienteStatusBadge({ status }) {
  return (
    <ClienteStatus status={status}>
      <div>
        <ClienteStatusText status={status}>{statusText(status)}</ClienteStatusText>
      </div>
    </ClienteStatus>
  );
}

export default ClienteStatusBadge;
