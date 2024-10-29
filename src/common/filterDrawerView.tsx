import React from 'react';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import { Title } from 'rizzui';
import { Drawer } from 'rizzui';
import Button from 'common/button';

export default function FilterDrawerView({
  isOpen,
  drawerTitle,
  hasSearched,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}>) {
  return (
    <Drawer
      placement="top"
      // customSize='230px'
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-20 "
      containerClassName="dark:bg-gray-100">
      <div className="flex h-full flex-col p-3">
        <div className="-mx-2 mb-3 flex items-center justify-between border-b border-gray-200 px-5 pb-4">
          <Title as="h6">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={'Close Filter'}
            onClick={() => setOpenDrawer(false)}>
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-5 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          label="Show Results"
          size="lg"
          color="info"
          onClick={() => setOpenDrawer(false)}
          className="mt-5 h-11 self-center p-2 w-32 text-sm"
        />
      </div>
    </Drawer>
  );
}
