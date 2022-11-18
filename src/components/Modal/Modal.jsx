import { useEffect } from 'react';
import { ModalField, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ bigImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });

  const onKeydown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalField>
        <img src={bigImage} alt="largeImage" />
      </ModalField>
    </Overlay>,
    modalRoot
  );
};
