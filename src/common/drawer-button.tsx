import { useEffect } from 'react';
import { cn } from 'utils';
import { useDirection } from 'hooks/use-direction';
import DrawerHeader from 'components/settings/drawer-header';
import { usePresets } from 'config/color-presets';
import { useApplyColorPreset, useColorPresets } from 'hooks/use-theme-color';
import { useDrawer } from 'hooks/use-drawer';
import { PiPlusBold } from 'react-icons/pi';

interface DrawerButtonProps {
  title: string;
  customSize?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function DrawerButton({
  title,
  customSize = '1080px',
  children,
}: DrawerButtonProps) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();
  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';
  }, [direction]);

  return (
    <button
      onClick={() => {
        openDrawer({
          view: (
            <>
              <DrawerHeader title={title} onClose={closeDrawer} />
              {children}
            </>
          ),
          placement: 'right',
          customSize: customSize,
        });
      }}
      className={cn(
        'w-full flex p-2 rounded font-semibold items-center flex-row @lg:w-auto bg-blue border-white hover:bg-blue-300 cl:bg-red text-white dark:hover:bg-white dark:hover:text-blue',
      )}>
      <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
      {title}
    </button>
  );
}
