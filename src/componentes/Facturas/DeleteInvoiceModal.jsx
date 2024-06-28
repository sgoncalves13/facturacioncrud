import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react';

import Button from './Button';

const Overlay = styled(Dialog.Overlay)`
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
  background-color: yellow;
  border-radius: 0.5rem;
  padding: 2rem;
  z-index: 7002;
`;

const ModalHeading = styled(Dialog.Title)`
  font-size: 1.25rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.75rem;
`;

const ModalMessage = styled(Dialog.Description)`
  font-size: 0.75rem;
  color: red;
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

function DeleteInvoiceModal({ id, isOpen, closeModal }) {
  const navigate = useNavigate();

  const deleteInvoice = () => {
    navigate('/Facturas');
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Overlay />
      <ModalContainer>
        <ModalHeading>Confirm Deletion</ModalHeading>
        <ModalMessage>
          Are you sure you want to delete invoice #{id}? This action cannot be undone.
        </ModalMessage>
        <ButtonContainer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={deleteInvoice}>
            Delete
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Dialog>
  );
}

export default DeleteInvoiceModal;
