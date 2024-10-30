import { PiXBold } from 'react-icons/pi';
import { cn } from 'utils';
import { Title } from 'rizzui';
import { ActionIcon } from 'rizzui';

import React from 'react';

export default function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
      <Title as="h5" className={cn('text-xl font-medium text-violet-800 font-sans')}>
        {!title ? 'Settings' : title}
      </Title>
      <ActionIcon variant="text" onClick={onClose} className={cn('h-7 w-7')} rounded="full">
        <PiXBold className="h-[18px] w-[18px]" />
      </ActionIcon>
    </div>
  );
}
