'use client';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from 'hooks/use-modal';
import { cn } from 'utils';
import FileUpload from '../file-upload';
import Button from 'common/button';

type ImportButtonProps = {
  title?: string;
  modalBtnLabel?: string;
  className?: string;
  buttonLabel?: string;
};

export default function ImportButton({
  title,
  modalBtnLabel = 'Import File',
  className,
  buttonLabel = 'Import',
}: React.PropsWithChildren<ImportButtonProps>) {
  const { openModal } = useModal();

  return (
    <Button
      color="DEFAULT"
      label={<PiArrowLineDownBold className="m-1 h-[18px] w-[18px]" />}
      variant="outline"
      onClick={() =>
        openModal({
          view: <FileUpload label={title} accept="csv" multiple={false} btnLabel={modalBtnLabel} />,
          customSize: '480px',
        })
      }
      className={cn('me-2.5 h-9 pe-3 ps-2.5', className)}
    />
  );
}
