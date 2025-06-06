import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import autoTable, { UserOptions, RowInput } from 'jspdf-autotable';
import dayjs from 'dayjs';
// import downloadcstfile from '../store/api/customer'
import axiosInstance from 'store/api/axios';

interface UserData {
  [key: string]: string | number | Date;
}

// export async function downloadFile (url: any, fileName: string) {
//   const key = url.replace("https://sazs-finance-app.s3.ap-south-1.amazonaws.com/", "");
//   // const signedurl= await downloadcstfile(key)
//   const signedurl = async (imagekey: string) => {
//     try {
//       const response = await axiosInstance
//         .post("getimagesignurl", { imagekey })
//         .then(result=> result)
//         .catch(err => {
//           console.log('Get Menu Api error', err);
//           return err;
//         });
//       return response;
//     } catch (error) {
//       console.log('Error fetching Menu:', error);
//     }
//   };
//   fetch(signedurl)
//     .then(response => response.blob()) // Convert the response into a blob
//     .then(blob => {
//       const blobUrl = URL.createObjectURL(blob); // Create a temporary URL for the blob
//       const anchor = document.createElement('a'); // Create an anchor element
//       anchor.href = blobUrl;
//       anchor.download = fileName; // Set the suggested download filename
//       document.body.appendChild(anchor); // Append the anchor to the DOM
//       anchor.click(); // Trigger the download
//       document.body.removeChild(anchor); // Clean up the DOM
//       URL.revokeObjectURL(blobUrl); // Revoke the temporary URL
//     })
//     .catch(error => {
//       console.error('Download failed:', error);
//     });
// }

export async function downloadFile(url: string | any, fileName: string) {
  const key = url.replace('https://sazs-finance-app.s3.ap-south-1.amazonaws.com/', '');

  // Get the signed URL from your API
  let signedurl: string;
  try {
    const response = await axiosInstance.post('getimagesignurl', { imagekey: key });
    signedurl = response.data?.signedUrl; // adjust based on your API response structure
    if (!signedurl) {
      throw new Error('Signed URL not found in response');
    }
  } catch (error) {
    console.error('Failed to fetch signed URL:', error);
    return;
  }

  // Download the file using the signed URL
  try {
    const blobResponse = await fetch(signedurl);
    const blob = await blobResponse.blob();

    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
}

export function exportToCSV(data: any[], fileName: string) {
  if (data.length === 0) {
    console.error('Data array is empty.');
    return;
  }

  // Generate the header dynamically based on the keys of the first object in the data array
  const header = Object.keys(data[0])
    .map(key => key.toUpperCase())
    .join(',');

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    `${header}\n` +
    data
      .map(row => {
        if (typeof row === 'object' && row !== null) {
          return Object.values(row).join(',');
        }
        return ''; // Return an empty string if row is not an object
      })
      .join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName + '.csv');
  document.body.appendChild(link);
  link.click();
}

export function exportToPDF(
  data: any[],
  header: string,
  fileName: string,
  loginUser: any,
  filters: any,
  orientation: 'p' | 'portrait' | 'l' | 'landscape',
  size: string,
  margin?: { top?: number; right?: number; bottom?: number; left?: number } | any,
) {
  const doc = new jsPDF(orientation, 'pt', size);
  if (['Pending List', 'Loan List', 'Customers List'].includes(fileName)) {
    if (margin) {
      const { top = 40, right = 40, bottom = 40, left = 40 } = margin;

      // Content Area Dimensions
      const contentWidth = doc.internal.pageSize.getWidth() - left - right;
      const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

      // Add Company Logo
      //const addHeader = (doc: jsPDF, pageNumber?: number) => {
      const logoWidth = 60;
      const logoHeight = 60;
      const centerX = (contentWidth - logoWidth) / 2 + left;
      doc.addImage(require('../images/sazsgrey.png'), 'jpeg', centerX, top, logoWidth, logoHeight);

      // Add Header Information
      doc.setFontSize(18);
      doc.text(loginUser.CompanyName || 'Admin', left, top + 30);

      doc.setFontSize(10);
      doc.setTextColor('gray');
      doc.text(loginUser.Address1 || '', left, top + 50);
      doc.text('City, State, ZIP', left, top + 65);
      doc.text(loginUser.MobileNo || '', left, top + 80);

      // Add File Name and Current Date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const currentDateWidth = doc.getStringUnitWidth(currentDate) * 10;
      const currentDateXCoordinate = doc.internal.pageSize.getWidth() - right - currentDateWidth;
      doc.text(currentDate, currentDateXCoordinate, top + 45);
      const fileNameWidth = doc.getStringUnitWidth(fileName) * 10;
      const fileNameWidthXCoordinate = doc.internal.pageSize.getWidth() - right - fileNameWidth;
      doc.text(fileName, fileNameWidthXCoordinate, top + 30);

      // Add Filters
      let listBy = '';
      if (filters.filters) {
        if (filters.filters.CreatedOn[0] && filters.filters.CreatedOn[1]) {
          const startDate = new Date(filters.filters.CreatedOn[0]).toLocaleDateString();
          const endDate = new Date(filters.filters.CreatedOn[1]).toLocaleDateString();
          listBy = `From: ${startDate} to ${endDate}`;
        } else if (filters.filters.IsActive) {
          listBy = `${filters.filters.IsActive ? 'Active List' : 'Inactive List'}`;
        } else {
          listBy = 'All List';
        }
      }
      const listByWidth = doc.getStringUnitWidth(listBy) * 10;
      const listByWidthXCoordinate = doc.internal.pageSize.getWidth() - right - listByWidth;
      doc.text(listBy, listByWidthXCoordinate, top + 60);

      const pageNumber = doc.getNumberOfPages();
      if (pageNumber) {
        doc.setFontSize(10);
        doc.setTextColor('black');
        const PageWidth = doc.getStringUnitWidth(`Page - ${pageNumber}`) * 10;
        const PageWidthXCoordinate = doc.internal.pageSize.getWidth() - right - PageWidth;
        doc.text(`Page - ${pageNumber}`, PageWidthXCoordinate, top + 80);
      }
      //}
      // Prepare Table Data
      const columns: string[] = Object.keys(data[0]);
      // const formatDate = (data: any) =>
      //   data.map((item: any) => ({
      //     ...item,
      //     CreatedOn: new Date(item.CreatedOn).toLocaleDateString(),
      //     ModifiedOn: new Date(item.ModifiedOn).toLocaleDateString(),
      //     DueDate: new Date(item.DueDate).toLocaleDateString(),
      //   }));
      const formatDate = (data: any) =>
        data.map((item: any) => ({
          ...item,
          CreatedOn: dayjs(item.CreatedOn).format('DD-MM-YYYY'),
          ModifiedOn: dayjs(item.ModifiedOn).format('DD-MM-YYYY'),
          DueDate: dayjs(item.DueDate).format('DD-MM-YYYY'),
        }));
      const formattedData = formatDate(data);
      const rows: RowInput[] = formattedData.map((row: any) => Object.values(row));

      // Dynamic Table Configuration
      const columnCount = columns.length;
      const pageWidth = contentWidth;
      const maxColumnWidth = 80;
      const minColumnWidth = 20;

      // Calculate column width dynamically
      const columnWidth =
        columnCount * maxColumnWidth > pageWidth
          ? Math.max(minColumnWidth, pageWidth / columnCount)
          : maxColumnWidth;

      // Adjust font size based on column count
      const fontSizeAdjusted = Math.max(7, Math.min(12, 500 / (columnCount * 5)));

      const options: UserOptions = {
        margin: { top, right, bottom, left },
        theme: 'grid',
        styles: {
          fontSize: fontSizeAdjusted,
          cellPadding: 4, //old 2
        },
        headStyles: {
          minCellHeight: 30, //old 20
          valign: 'middle',
          halign: 'center',
          overflow: 'linebreak',
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontSize: fontSizeAdjusted,
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          valign: 'middle',
          halign: 'center',
          overflow: 'linebreak',
          fontSize: fontSizeAdjusted,
        },
        columnStyles: {},
        head: [columns],
        body: rows,
        startY: top + 100,
        tableWidth: columnWidth * columnCount > pageWidth ? 'wrap' : 'auto',
        // didDrawPage: () => {
        //   const pageNumber = doc.getNumberOfPages(); // Get the current page number
        //   addHeader(doc, pageNumber);

        // },
      };

      // Dynamically set column width
      columns.forEach((column, index) => {
        options.columnStyles![index.toString()] = { cellWidth: columnWidth };
      });

      // Render the Table
      autoTable(doc, options);

      // Save the PDF
      doc.save(`${fileName}.pdf`);
    } else {
      console.error('Margins not provided!');
    }
  } else {
    if (margin) {
      const { top, right, bottom, left } = margin;

      const contentWidth = doc.internal.pageSize.getWidth() - left - right;
      const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

      const logoWidth = 60;
      const logoHeight = 60;
      const centerX = (contentWidth - logoWidth) / 2 + left;
      const centerY = (contentHeight - logoHeight) / 2 + top;
      doc.addImage(
        require('../images/sazsgrey.png'),
        'jpeg',
        centerX,
        top + 20,
        logoWidth,
        logoHeight,
      );

      doc.setFontSize(18);
      doc.text(loginUser.CompanyName ? loginUser.CompanyName : 'Admin', left, top + 30);

      doc.setFontSize(10);
      doc.setTextColor('gray');
      doc.text(loginUser.Address1 ? loginUser.Address1 : '', left, top + 50);
      doc.text('City, State, ZIP', left, top + 65);
      doc.text(loginUser.MobileNo ? loginUser.MobileNo : '', left, top + 80);

      doc.setFontSize(12);
      doc.setTextColor('gray');
      const text = fileName;
      const fontSize = 12;
      let textWidth = doc.getStringUnitWidth(text) * fontSize;
      let xCoordinate = doc.internal.pageSize.getWidth() - right - textWidth;
      const yCoordinate = top + 70;
      doc.text(text, xCoordinate, yCoordinate);

      let listBy = '';
      if (filters.filters) {
        if (filters.filters.CreatedOn[0] && filters.filters.CreatedOn[1]) {
          const startDate = filters.filters.CreatedOn[0]
            ? new Date(filters.filters.CreatedOn[0]).toLocaleDateString()
            : '';
          const endDate = filters.filters.CreatedOn[1]
            ? new Date(filters.filters.CreatedOn[1]).toLocaleDateString()
            : '';
          listBy = `From: ${startDate} to ${endDate}`;
        } else if (filters.filters.IsActive) {
          listBy = `${filters.filters.IsActive ? 'Active List' : 'InActive List'}`;
        } else {
          listBy = 'All List';
        }
      }
      textWidth = doc.getStringUnitWidth(listBy) * fontSize;
      xCoordinate = doc.internal.pageSize.getWidth() - right - textWidth;
      doc.text(listBy, xCoordinate, top + 85);

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const currentDateWidth = doc.getStringUnitWidth(currentDate) * fontSize;
      const currentDateXCoordinate = doc.internal.pageSize.getWidth() - right - currentDateWidth;
      doc.text(currentDate, currentDateXCoordinate, top + 55);

      const columns: string[] = Object.keys(data[0]);

      // const formatDate = (data: any) => {
      //   return data.map((item: any) => {
      //     const createdDate = new Date(item.CreatedOn).toLocaleString('en-US', {
      //       year: 'numeric',
      //       month: 'short',
      //       day: '2-digit',
      //       // hour: '2-digit',
      //       // minute: '2-digit',
      //     });
      //     const modifiedDate = new Date(item.ModifiedOn).toLocaleString('en-US', {
      //       year: 'numeric',
      //       month: 'short',
      //       day: '2-digit',
      //       // hour: '2-digit',
      //       // minute: '2-digit',
      //     });
      //     return {
      //       ...item,
      //       CreatedOn: createdDate,
      //       ModifiedOn: modifiedDate,
      //     };
      //   });
      // };
      const formatDate = (data: any) =>
        data.map((item: any) => ({
          ...item,
          CreatedOn: dayjs(item.CreatedOn).format('DD-MM-YYYY'),
          ModifiedOn: dayjs(item.ModifiedOn).format('DD-MM-YYYY'),
          DueDate: dayjs(item.DueDate).format('DD-MM-YYYY'),
        }));
      const formattedData = formatDate(data);
      const rows: RowInput[] = formattedData.map((row: any) => Object.values(row));

      const columnCount = columns.length;
      const fontSizeMultiplier = 1.5 - columnCount * 0.5;
      const fontSizeAdjusted = Math.max(9, fontSize * fontSizeMultiplier);
      const cellWidthAdjusted = Math.min(80, 500 / columnCount);

      const options: UserOptions = {
        margin: { top: 100, right: right, bottom: bottom, left: left },
        styles: {
          cellPadding: 2,
        },
        headStyles: {
          minCellHeight: 30,
          // halign: 'center',
          valign: 'middle',
          overflow: 'linebreak',
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontSize: columnCount > 9 ? (cellWidthAdjusted / columnCount) * 2 : fontSizeAdjusted,
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          // halign: 'center',
          valign: 'middle',
          overflow: 'linebreak',
          fontSize: columnCount > 9 ? (cellWidthAdjusted / columnCount) * 2 : fontSizeAdjusted,
        },
        theme: 'grid',
        head: [columns],
        body: rows,
        startY: top + 150,
        columnStyles: {} as { [key: string]: any },
        didParseCell: function (hookData) {
          if (hookData.column.index !== null && hookData.cell.text) {
            const cellContentWidth =
              doc.getStringUnitWidth(hookData.cell.text.toString()) * fontSizeAdjusted;
            if (cellContentWidth > cellWidthAdjusted) {
              hookData.cell.styles.cellWidth = cellWidthAdjusted;
              hookData.cell.styles.overflow = 'linebreak';
              const splitText = doc.splitTextToSize(
                hookData.cell.text.toString(),
                cellWidthAdjusted,
              );
              hookData.cell.text = splitText.join('\n');
            }
          }
        },
      };

      if (!options.columnStyles) {
        options.columnStyles = {};
      }
      columns.forEach((column, index) => {
        options.columnStyles![index.toString()] = { cellWidth: 'auto' };
      });

      autoTable(doc, options);

      doc.save(`${fileName}.pdf`);
    } else {
      console.error('Margins not provided!');
    }
  }
}

///final
// export function exportToPDF(
//   data: any[],
//   header: string,
//   fileName: string,
//   loginUser: any,
//   filters: any,
//   orientation: 'p' | 'portrait' | 'l' | 'landscape',
//   size: string,
//   margin?: { top?: number; right?: number; bottom?: number; left?: number } | any,
// ) {
//   const doc = new jsPDF(orientation, 'pt', size);
//   if (margin) {
//     const { top = 40, right = 40, bottom = 40, left = 40 } = margin;

//     // Content Area Dimensions
//     const contentWidth = doc.internal.pageSize.getWidth() - left - right;
//     const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

//     // Add Company Logo
//     //const addHeader = (doc: jsPDF, pageNumber?: number) => {
//     const logoWidth = 60;
//     const logoHeight = 60;
//     const centerX = (contentWidth - logoWidth) / 2 + left;
//     doc.addImage(require('../images/sazsgrey.png'), 'jpeg', centerX, top, logoWidth, logoHeight);

//     // Add Header Information
//     doc.setFontSize(18);
//     doc.text(loginUser.CompanyName || 'Admin', left, top + 30);

//     doc.setFontSize(10);
//     doc.setTextColor('gray');
//     doc.text(loginUser.Address1 || '', left, top + 50);
//     doc.text('City, State, ZIP', left, top + 65);
//     doc.text(loginUser.MobileNo || '', left, top + 80);

//     // Add File Name and Current Date
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     });
//     const currentDateWidth = doc.getStringUnitWidth(currentDate) * 10;
//     const currentDateXCoordinate = doc.internal.pageSize.getWidth() - right - currentDateWidth;
//     doc.text(currentDate, currentDateXCoordinate, top + 45);
//     const fileNameWidth = doc.getStringUnitWidth(fileName) * 10;
//     const fileNameWidthXCoordinate = doc.internal.pageSize.getWidth() - right - fileNameWidth;
//     doc.text(fileName, fileNameWidthXCoordinate, top + 30);

//     // Add Filters
//     let listBy = '';
//     if (filters.filters) {
//       if (filters.filters.CreatedOn[0] && filters.filters.CreatedOn[1]) {
//         const startDate = new Date(filters.filters.CreatedOn[0]).toLocaleDateString();
//         const endDate = new Date(filters.filters.CreatedOn[1]).toLocaleDateString();
//         listBy = `From: ${startDate} to ${endDate}`;
//       } else if (filters.filters.IsActive) {
//         listBy = `${filters.filters.IsActive ? 'Active List' : 'Inactive List'}`;
//       } else {
//         listBy = 'All List';
//       }
//     }
//     const listByWidth = doc.getStringUnitWidth(listBy) * 10;
//     const listByWidthXCoordinate = doc.internal.pageSize.getWidth() - right - listByWidth;
//     doc.text(listBy, listByWidthXCoordinate, top + 60);

//     const pageNumber = doc.getNumberOfPages();
//     if (pageNumber) {
//       doc.setFontSize(10);
//       doc.setTextColor('black');
//       const PageWidth = doc.getStringUnitWidth(`Page - ${pageNumber}`) * 10;
//       const PageWidthXCoordinate = doc.internal.pageSize.getWidth() - right - PageWidth;
//       doc.text(`Page - ${pageNumber}`, PageWidthXCoordinate, top + 80);
//     }
//     //}
//     // Prepare Table Data
//     const columns: string[] = Object.keys(data[0]);
//     // const formatDate = (data: any) =>
//     //   data.map((item: any) => ({
//     //     ...item,
//     //     CreatedOn: new Date(item.CreatedOn).toLocaleDateString(),
//     //     ModifiedOn: new Date(item.ModifiedOn).toLocaleDateString(),
//     //     DueDate: new Date(item.DueDate).toLocaleDateString(),
//     //   }));
//     const formatDate = (data: any) =>
//       data.map((item: any) => ({
//         ...item,
//         CreatedOn: dayjs(item.CreatedOn).format('DD-MM-YYYY'),
//         ModifiedOn: dayjs(item.ModifiedOn).format('DD-MM-YYYY'),
//         DueDate: dayjs(item.DueDate).format('DD-MM-YYYY'),
//       }));
//     const formattedData = formatDate(data);
//     const rows: RowInput[] = formattedData.map((row: any) => Object.values(row));

//     // Dynamic Table Configuration
//     const columnCount = columns.length;
//     const pageWidth = contentWidth;
//     const maxColumnWidth = 80;
//     const minColumnWidth = 20;

//     // Calculate column width dynamically
//     const columnWidth =
//       columnCount * maxColumnWidth > pageWidth
//         ? Math.max(minColumnWidth, pageWidth / columnCount)
//         : maxColumnWidth;

//     // Adjust font size based on column count
//     const fontSizeAdjusted = Math.max(7, Math.min(12, 500 / (columnCount * 5)));

//     const options: UserOptions = {
//       margin: { top, right, bottom, left },
//       theme: 'grid',
//       styles: {
//         fontSize: fontSizeAdjusted,
//         cellPadding: 4, //old 2
//       },
//       headStyles: {
//         minCellHeight: 30, //old 20
//         valign: 'middle',
//         halign: 'center',
//         overflow: 'linebreak',
//         fillColor: [41, 128, 185],
//         textColor: [255, 255, 255],
//         fontSize: fontSizeAdjusted,
//       },
//       bodyStyles: {
//         textColor: [0, 0, 0],
//         valign: 'middle',
//         halign: 'center',
//         overflow: 'linebreak',
//         fontSize: fontSizeAdjusted,
//       },
//       columnStyles: {},
//       head: [columns],
//       body: rows,
//       startY: top + 100,
//       tableWidth: columnWidth * columnCount > pageWidth ? 'wrap' : 'auto',
//       // didDrawPage: () => {
//       //   const pageNumber = doc.getNumberOfPages(); // Get the current page number
//       //   addHeader(doc, pageNumber);

//       // },
//     };

//     // Dynamically set column width
//     columns.forEach((column, index) => {
//       options.columnStyles![index.toString()] = { cellWidth: columnWidth };
//     });

//     // Render the Table
//     autoTable(doc, options);

//     // Save the PDF
//     doc.save(`${fileName}.pdf`);
//   } else {
//     console.error('Margins not provided!');
//   }
// }

export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  // XLSX.utils.sheet_add_aoa(worksheet, [header.split(',')], { origin: -1 });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
