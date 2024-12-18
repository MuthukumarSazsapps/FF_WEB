// import { cn } from 'utils';
// import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
// import { FileWithPath, useDropzone } from 'react-dropzone';
// import UploadIcon from 'components/shape/upload';
// import { FieldError } from 'rizzui';
// import { Text } from 'rizzui';
// import { PiPencilSimple } from 'react-icons/pi';
// import { PiEyeBold } from 'react-icons/pi';
// import Button from './button';
// import { Link } from 'react-router-dom';

// interface AvatarUploadProps {
//   name: string;
//   className?: string;
//   error?: string;
//   getFile: (key: string) => string;
//   setFile: (data: string) => void;
//   avatar: string;
//   role?: string;
// }

// const AvatarUpload = forwardRef<HTMLDivElement, AvatarUploadProps>(
//   (
//     { name, className, error, getFile: getValue, setFile: setValue, avatar, role = 'subscriber' },
//     ref,
//   ) => {
//     const [file, setFile] = useState<string>();

//     const formValue = getValue(name);

//     const onDrop = useCallback(
//       (file: FileWithPath[]) => {
//         setValue(URL.createObjectURL(file[0]));
//         setFile(URL.createObjectURL(file[0]));
//       },
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [file],
//     );

//     console.log(avatar, 'avatar');

//     useEffect(() => {
//       setValue(avatar);
//       setFile(avatar);
//     }, [avatar]);

//     const { getRootProps, getInputProps } = useDropzone({
//       onDrop,
//       accept: {
//         'image/jpeg': [],
//         'image/png': [],
//         'image/webp': [],
//         'image/gif': [],
//         'image/svg': [],
//         'image/svg+xml': [],
//       },
//       maxFiles: 1,
//     });
//     const getsrc: () => string | undefined = () => {
//       const image = formValue ? formValue : file ? file : '';
//       if (!image) return '';

//       if (image.toString().includes('blob:http')) return image;
//       // return `${process.env.REACT_APP_API_URL}${role}/${image}`;----old
//       return image;
//     };

//     return (
//       <div className={cn('grid gap-5', className)} ref={ref}>
//         <Link to={avatar} target="_blank">
//           <Button label="view" className="w-4" type="button" />
//         </Link>
//         <div className={cn('relative grid h-40 w-40 place-content-center rounded-full border')}>
//           {formValue && file ? (
//             <>
//               <figure className="absolute inset-0 rounded-full flex justify-center items-center">
//                 <img
//                   alt="user avatar"
//                   src={getsrc()}
//                   className="!h-full !w-full object-cover rounded-full"
//                 />
//               </figure>
//               <div
//                 {...getRootProps()}
//                 className={cn(
//                   'absolute inset-0 grid place-content-center rounded-full bg-black/30',
//                 )}>
//                 <PiPencilSimple className="h-5 w-5 text-white" />
//                 <input {...getInputProps()} />
//               </div>
//             </>
//           ) : (
//             <div
//               {...getRootProps()}
//               className={cn('absolute inset-0 z-10 grid cursor-pointer place-content-center')}>
//               <input {...getInputProps()} />
//               <UploadIcon className="mx-auto h-12 w-12" />
//               <Text className="font-medium">Drop or select file</Text>
//             </div>
//           )}
//         </div>
//         {error && <FieldError error={error} />}
//       </div>
//     );
//   },
// );

// export default AvatarUpload;

import { cn, downloadFile } from 'utils';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import UploadIcon from 'components/shape/upload';
import { FieldError } from 'rizzui';
import { Text } from 'rizzui';
import { PiPencilSimple } from 'react-icons/pi';
import Button from './button';
import { Link } from 'react-router-dom';

interface AvatarUploadProps {
  name: string;
  className?: string;
  error?: string;
  getFile: (key: string) => string;
  setFile: (data: string) => void;
  avatar: string;
  role?: string;
}

const AvatarUpload = forwardRef<HTMLDivElement, AvatarUploadProps>(
  (
    { name, className, error, getFile: getValue, setFile: setValue, avatar, role = 'subscriber' },
    ref,
  ) => {
    const [file, setFile] = useState<string>();

    const formValue = getValue(name);

    const onDrop = useCallback(
      (files: FileWithPath[]) => {
        const uploadedFile = files[0];
        const fileUrl = URL.createObjectURL(uploadedFile);

        setValue(fileUrl);
        setFile(fileUrl);
      },
      [setValue],
    );

    useEffect(() => {
      setValue(avatar);
      setFile(avatar);
    }, [avatar, setValue]);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
        'image/gif': [],
        'image/svg+xml': [],
        'application/pdf': [],
        'application/msword': [],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
        'application/vnd.ms-excel': [],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
        'text/plain': [],
      },
      maxFiles: 1,
    });

    const getFileType = () => {
      if (!formValue && !file) return null;
      if (
        formValue?.includes('blob:') ||
        formValue?.endsWith('.jpg') ||
        formValue?.endsWith('.png') ||
        file?.includes('blob:') ||
        file?.includes('.jpg') ||
        file?.endsWith('.png')
      )
        return 'image';
      if (formValue?.endsWith('.pdf') || file?.endsWith('.pdf')) return 'pdf';
      return 'document';
    };

    const fileType = getFileType();

    const getFileSrc = () => {
      if (
        formValue?.includes('blob:') ||
        formValue?.includes('.jpg') ||
        formValue?.includes('.png')
      )
        return formValue;
      if (file?.includes('blob:') || formValue?.includes('.jpg') || formValue?.includes('.png'))
        return file;
      console.log(formValue, file);
      return formValue || file || '';
    };

    return (
      <div className={cn('grid gap-5', className)} ref={ref}>
        {/* <Link to={`${getFileSrc()}`} target="_blank"> */}
        <Button
          label="view"
          className="w-4"
          type="button"
          onClick={() => downloadFile(`${getFileSrc()}`, 'image')}
        />
        <button onClick={() => downloadFile(avatar, 'image')}>download</button>
        {/* </Link> */}
        <div className={cn('relative grid h-40 w-40 place-content-center rounded-full border')}>
          {formValue || file ? (
            <>
              {fileType === 'image' && (
                <figure className="absolute inset-0 rounded-full flex justify-center items-center">
                  <img
                    alt="uploaded file"
                    src={getFileSrc()}
                    className="!h-full !w-full object-cover rounded-full"
                  />
                </figure>
              )}
              {fileType === 'pdf' && (
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <a
                    href={getFileSrc()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline">
                    View PDF
                  </a>
                </div>
              )}
              {fileType === 'document' && (
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <a
                    href={getFileSrc()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline">
                    View Document
                  </a>
                </div>
              )}
              <div
                {...getRootProps()}
                className={cn(
                  'absolute hover:cursor-pointer inset-0 grid place-content-center rounded-full bg-black/30',
                )}>
                <PiPencilSimple className="h-5 w-5 text-white " />
                <input {...getInputProps()} />
              </div>
            </>
          ) : (
            <div
              {...getRootProps()}
              className={cn('absolute inset-0 z-10 grid cursor-pointer place-content-center')}>
              <input {...getInputProps()} />
              <UploadIcon className="mx-auto h-12 w-12" />
              <Text className="font-medium">Drop or select file</Text>
            </div>
          )}
        </div>
        {error && <FieldError error={error} />}
      </div>
    );
  },
);

export default AvatarUpload;
