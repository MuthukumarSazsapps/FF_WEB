'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

type ModalTypes = {
  view: React.ReactNode;
  className?: string;
  size?: 'sm' | 'DEFAULT' | 'lg' | 'xl' | 'full';
  isOpen: boolean;
  customSize?: string;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  className: '',
  size: 'DEFAULT',
  customSize: '320px',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    className,
    size,
    customSize,
  }: {
    view: React.ReactNode;
    className?: string;
    size?: 'sm' | 'DEFAULT' | 'lg' | 'xl' | 'full';
    customSize?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      className: className,
      size: size,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
