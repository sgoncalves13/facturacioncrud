import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react';
import environment from '../../../environment.json'
import Button from '../Button';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.49);
  z-index: 7000;
`;

const ModalContainer = styled.div`
  position: fixed;
  width: calc(100% - 48px);
  max-width: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  padding: 2rem;
  z-index: 7002;
`;

const ModalHeading = styled(Dialog.Title)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0C0E16;
  margin-bottom: 0.75rem;
`;

const ModalMessage = styled(Dialog.Description)`
  font-size: 0.75rem;
  color: #888EB0;
  letter-spacing: -0.23px;
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

function DeleteInvoiceModal({ id, clienteCodigo, rowversion, isOpen, closeModal }) {
  const navigate = useNavigate();

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

  const deleteInvoice = async () => {

    const FacturaDelete = {
      id: id,
      rowVersion: rowversion
    }

    const response = await fetch(`${environment.baseUrl}/Factura/DeleteFactura`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
      },
      body: JSON.stringify(FacturaDelete),
  });
    if (response.ok) {
      alert('Factura con id: ' +String(id)+ ' eliminada exitosamente');
      navigate('/Facturas');
    } else {
    const errorText = await response.text();
    console.error('Error:', errorText);
    alert('Error al eliminar el cliente con id: ' + String(id) + '. Detalles: ' + errorText);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Overlay />
      <ModalContainer>
        <ModalHeading>Confirm Deletion</ModalHeading>
        <ModalMessage>
         ¿Estas seguro que quieres eliminar el cliente #{clienteCodigo}? Esta acción no se puede deshacer.
        </ModalMessage>
        <ButtonContainer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button mode={"delete"} variant="warning" onClick={deleteInvoice}>
            Delete
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Dialog>
  );
}

export default DeleteInvoiceModal;
