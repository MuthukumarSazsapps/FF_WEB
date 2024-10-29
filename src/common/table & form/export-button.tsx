'use client';

import { forwardRef, useState } from 'react';
import { PiArrowLineUpBold } from 'react-icons/pi';
import { cn } from 'utils';
import { Button, Popover } from 'rizzui';
import { exportToCSV } from 'utils';
import { Title } from 'rizzui';
import { exportToPDF } from 'utils';
import { exportToExcel } from 'utils';
import useUsers from 'hooks/use-users';
import PdfPreview from 'common/pdf-preview';
import { useModal } from 'hooks/use-modal';

// import PDFViewer from 'pdf-viewer-reactjs'

type ExportButtonProps = {
  data: unknown[] | any[]; // Array containing unknown or any type elements
  header: string;
  fileName: string;
  className?: string;
  filters: any; // Optional prop
};
const ExportButton = forwardRef<HTMLButtonElement, ExportButtonProps>(
  ({ data, header, fileName, className, filters }: ExportButtonProps, ref) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    const { loginUser } = useUsers();
    const { openModal } = useModal();

    const handleExportClick = (option: string) => {
      console.log(option);
      switch (option) {
        case 'csv':
          exportToCSV(data, fileName);
          break;
        case 'xlsx':
          exportToExcel(data, fileName);
          break;
        default:
          break;
      }
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
    };
    const handleExportPDFClick = (
      orientation: 'p' | 'portrait' | 'l' | 'landscape',
      size: string,
    ) => {
      exportToPDF(data, header, fileName, loginUser, filters, orientation, size);
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
    };

    return (
      <div
        // onMouseLeave={() => setOpen(false)}
        className={cn('relative', className)}>
        <Popover
          isOpen={open}
          setIsOpen={setOpen}
          content={() => (
            <div className="px-0.5 pt-2 text-left rtl:text-right">
              <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
                Export Data
              </Title>
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleExportClick('csv')}>
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleExportClick('xlsx')}>
                  Export as XLSX
                </li>
                <Popover
                  isOpen={open2}
                  setIsOpen={setOpen2}
                  content={() => (
                    <div className="px-0.5 pt-2 text-left rtl:text-right">
                      <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
                        Orientaiton
                      </Title>
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleExportPDFClick('portrait', 'a4')}>
                          Default
                        </li>

                        <Popover
                          isOpen={open3}
                          setIsOpen={setOpen3}
                          content={() => (
                            <div className="px-0.5 pt-2 text-left rtl:text-right">
                              <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
                                Size
                              </Title>
                              <ul>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('landscape', 'a4')}>
                                  a4
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('landscape', 'a3')}>
                                  a3
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('landscape', 'a2')}>
                                  a2
                                </li>
                              </ul>
                            </div>
                          )}
                          shadow="sm"
                          placement="left-start"
                          className="dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">landscape</li>
                        </Popover>
                        <Popover
                          isOpen={open4}
                          setIsOpen={setOpen4}
                          content={() => (
                            <div className="px-0.5 pt-2 text-left rtl:text-right">
                              <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
                                Size
                              </Title>
                              <ul>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('portrait', 'a4')}>
                                  a4
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('portrait', 'a3')}>
                                  a3
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleExportPDFClick('portrait', 'a2')}>
                                  a2
                                </li>
                              </ul>
                            </div>
                          )}
                          shadow="sm"
                          placement="left-start"
                          className="dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">portrait</li>
                        </Popover>
                      </ul>
                    </div>
                  )}
                  shadow="sm"
                  placement="left-start"
                  className="dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Export as PDF</li>
                </Popover>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    openModal({
                      view: (
                        <PdfPreview
                          className="w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm"
                          data={data}
                          header={header}
                          fileName={fileName}
                          filters={filters}
                        />
                      ),
                      customSize: '420px',
                    })
                  }>
                  Export Pdf Preview
                </li>
              </ul>
            </div>
          )}
          // gap={2}
          shadow="sm"
          placement="bottom-end"
          className="dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
          <Button
            type="button"
            color="DEFAULT"
            variant="outline"
            className={'me-2.5 h-9 pe-3 ps-2.5'}>
            <PiArrowLineUpBold className="m-1 h-[18px] w-[18px]" />
          </Button>
        </Popover>
      </div>
    );
  },
);
export default ExportButton;
