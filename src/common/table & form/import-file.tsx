'use client';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from 'hooks/use-modal';
import { cn } from 'utils';
import FileUpload from '../file-upload';
import Button from 'common/button';
import UploadIcon from 'components/shape/upload';

type ImportFileUploaderProps = {
  title?: string;
  modalBtnLabel?: string;
  className?: string;
  buttonLabel?: string;
  label: string;
};

export default function ImportFileUploader({
  title,
  modalBtnLabel = 'Import File',
  className,
  label,
  buttonLabel = 'Import',
}: React.PropsWithChildren<ImportFileUploaderProps>) {
  const { openModal } = useModal();

  return (
    <div className="flex-col ">
      <p className="">{label}</p>
      <UploadIcon
        className={cn('me-2.5 h-9 pe-3 ps-2.5 cursor-pointer block', className)}
        onClick={() =>
          openModal({
            view: (
              <FileUpload label={title} accept="csv" multiple={false} btnLabel={modalBtnLabel} />
            ),
            customSize: '480px',
          })
        }
      />
    </div>
  );
}
