import { useModal } from 'hooks/use-modal';
import React, { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Input, Radio, RadioGroup, Title } from 'rizzui';
import { cn } from 'utils';
import UploadZone from './fileupload/upload-zone';
import FormGroup from './table & form/form-group';

import { exportToPDF } from 'utils';
import useUsers from 'hooks/use-users';
import Button from './button';
import { Controller } from 'react-hook-form';
import SelectBox from './select';

type Previewtype = {
  data: unknown[] | any[]; // Array containing unknown or any type elements
  header: string;
  fileName: string;
  className?: string;
  filters: any; // Optional prop
};

const PdfPreview = ({ data, className, header, filters, fileName }: Previewtype) => {
  const { closeModal } = useModal();
  const { loginUser } = useUsers();
  const [value1, setValue1] = useState('portrait');
  const [value2, setValue2] = useState('A4');
  const [margin, setMargin] = useState({
    top: 0.5,
    right: 0.5,
    bottom: 0.5,
    left: 0.5,
  });

  const paperSize = [
    {
      name: 'A4',
      value: 'A4',
    },
    {
      name: 'A3',
      value: 'A3',
    },
    {
      name: 'A2',
      value: 'A2',
    },
  ];

  const handleExportPDFClick = (
    orientation: 'p' | 'portrait' | 'l' | 'landscape',
    size: 'A4' | 'A3' | 'A2',
    margin: any,
  ) => {
    exportToPDF(data, header, fileName, loginUser, filters, orientation, size, margin);
  };

  const handleSubmit = (value1: string, value2: string, margin: any) => {
    if (value1 === 'p' || value1 === 'portrait' || value1 === 'l' || value1 === 'landscape') {
      if (value2 === 'A4' || value2 === 'A3' || value2 === 'A2') {
        handleExportPDFClick(value1, value2, margin);
        closeModal();
      }
    }
  };

  return (
    <div className={cn('max-w-full rounded-md p-6', className)}>
      <div className="flex items-center justify-between">
        <Title as="h4" className="text-medium text-violet-800 font-bold">
          Pdf Downloader
        </Title>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="flex flex-row p-2 mt-2">
        <div className="basis-2/5">
          <p className="m-2 text-violet-800 text-base font-medium">Orientation</p>
        </div>
        <div className="mt-2 basis-3/5">
          <RadioGroup value={value1} setValue={setValue1} className="flex gap-4">
            <Radio label="Portrait" value="portrait" />
            <Radio label="Landscape" value="landscape" />
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-row  p-2 mt-2">
        <div className="basis-2/5">
          <p className="m-2 text-violet-800 text-base font-medium">Paper Size</p>
        </div>
        <div className=" mt-2 basis-3/5">
          <SelectBox
            placeholder="Select Status"
            options={paperSize}
            onChange={(val: string) => setValue2(val)}
            value={value2}
            getOptionValue={option => option.value}
            displayValue={selected => paperSize?.find(r => r.value === selected)?.name ?? ''}
          />
        </div>
      </div>

      <div className="flex flex-row mt-2  p-2">
        <div className="basis-2/5">
          <p className="m-2 text-violet-800  text-base font-medium">File Name</p>
        </div>
        <div className="basis-3/5 m-2">{fileName}</div>
      </div>
      <div className=" mt-2  p-2">
        <div className="basis-2/5">
          <p className="m-2 text-violet-800  text-base font-medium">Margin</p>
        </div>
        <div className="flex flex-row basis-3/5 m-2 justify-between">
          <div className="basis-2/5">
            <Input
              type="number"
              label="Top"
              value={margin.top}
              onChange={(e: any) => setMargin({ ...margin, top: parseFloat(e.target.value) })}
            />
          </div>
          <div className="basis-2/5">
            <Input
              type="number"
              label="Right"
              value={margin.right}
              onChange={(e: any) => setMargin({ ...margin, right: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex flex-row basis-3/5 m-2 justify-between">
          <div className="basis-2/5">
            <Input
              type="number"
              label="Bottom"
              value={margin.bottom}
              onChange={(e: any) => setMargin({ ...margin, bottom: parseFloat(e.target.value) })}
            />
          </div>
          <div className="basis-2/5">
            <Input
              type="number"
              label="Left"
              value={margin.left}
              onChange={(e: any) => setMargin({ ...margin, left: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          label="Cancel"
          className="w-20 h-8  mt-3 me-2 bg-red"
          onClick={() => closeModal()}
        />
        <Button
          label="Generate"
          className="w-20 h-8  mt-3"
          onClick={() => handleSubmit(value1, value2, margin)}
        />
      </div>
    </div>
  );
};

// const PdfPreview = ({ data, className, header, filters, fileName }: Previewtype) => {
//   const { closeModal } = useModal();
//   const { loginUser } = useUsers();
//   const [orientation, setOrientation] = useState('portrait');
//   const [paperSize, setPaperSize] = useState('A4');
//   const [margin, setMargin] = useState({ top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 });

//   const handleSubmit = () => {
//       if (['portrait', 'landscape'].includes(orientation) && ['A4', 'A3', 'A2'].includes(paperSize)) {
//           exportToPDF(data, header, fileName, loginUser, filters, orientation as 'portrait' | 'landscape', paperSize, margin);
//           closeModal();
//       }
//   };

//   return (
//       <div className={cn('max-w-full rounded-md p-6', className)}>
//           <Title as="h4" className="text-medium text-violet-800 font-bold">
//               Pdf Downloader
//           </Title>
//           <div className="flex flex-row mt-2">
//               <RadioGroup value={orientation} setValue={setOrientation}>
//                   <Radio label="Portrait" value="portrait" />
//                   <Radio label="Landscape" value="landscape" />
//               </RadioGroup>
//               <SelectBox
//                   options={[
//                       { name: 'A4', value: 'A4' },
//                       { name: 'A3', value: 'A3' },
//                       { name: 'A2', value: 'A2' },
//                   ]}
//                   value={paperSize}
//                   onChange={setPaperSize}
//               />
//           </div>
//           <Button label="Generate" onClick={handleSubmit} />
//       </div>
//   );
// };

export default PdfPreview;
