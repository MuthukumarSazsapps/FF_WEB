import { useDrawer } from 'hooks/use-drawer';
import DrawerHeader from 'components/settings/drawer-header';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

type DrawerProbs = {
  children: React.ReactNode;
  customSize?: string;
  title: string;
};
export const UpdateDrawer = ({
  children,
  title = 'Update',
  customSize = '1080px',
}: DrawerProbs) => {
  const { openDrawer, closeDrawer } = useDrawer();
  return (
    <BsPencilFill
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader title={title} onClose={closeDrawer} />
              {children}
            </>
          ),
          placement: 'right',
          customSize: customSize,
        })
      }
      className="me-2 h-[14px] hover:text-blue w-[14px] ml-2 text-gray-500 rounded"
    />
  );
};
