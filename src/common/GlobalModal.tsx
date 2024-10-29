'use client';

import { useEffect } from 'react';
import { Modal } from 'rizzui';
import { useModal } from '../hooks/use-modal';

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const pathname = window.location.pathname;

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100">
      {view}
    </Modal>
  );
}
