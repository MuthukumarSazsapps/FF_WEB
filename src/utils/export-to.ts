import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import autoTable, { UserOptions, RowInput } from 'jspdf-autotable';

interface UserData {
  [key: string]: string | number | Date;
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
//     console.log(margin);

//     const { top, right, bottom, left } = margin;

//     const contentWidth = doc.internal.pageSize.getWidth() - left - right;
//     const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

//     const logoWidth = 60;
//     const logoHeight = 60;
//     const centerX = (contentWidth - logoWidth) / 2 + left;
//     const centerY = (contentHeight - logoHeight) / 2 + top;
//     doc.addImage(
//       require('../images/sazsgrey.png'),
//       'jpeg',
//       centerX,
//       top + 20,
//       logoWidth,
//       logoHeight,
//     );

//     doc.setFontSize(18);
//     doc.text(loginUser.CompanyName ? loginUser.CompanyName : 'Admin', left + 40, top + 30);

//     doc.setFontSize(10);
//     doc.setTextColor('gray');
//     doc.text(loginUser.Address1 ? loginUser.Address1 : '', left + 40, top + 50);
//     doc.text('City, State, ZIP', left + 40, top + 65);
//     doc.text(loginUser.MobileNo ? loginUser.MobileNo : '', left + 40, top + 80);

//     doc.setFontSize(12);
//     doc.setTextColor('gray');
//     const text = fileName;
//     const fontSize = 12;
//     let textWidth = doc.getStringUnitWidth(text) * fontSize;
//     let xCoordinate = doc.internal.pageSize.getWidth() - right - textWidth - 40;
//     const yCoordinate = top + 70;
//     doc.text(text, xCoordinate, yCoordinate);

//     let listBy = '';
//     if (filters.filters) {
//       if (filters.filters.CreatedOn[0] && filters.filters.CreatedOn[1]) {
//         const startDate = filters.filters.CreatedOn[0]
//           ? new Date(filters.filters.CreatedOn[0]).toLocaleDateString()
//           : '';
//         const endDate = filters.filters.CreatedOn[1]
//           ? new Date(filters.filters.CreatedOn[1]).toLocaleDateString()
//           : '';
//         listBy = `From: ${startDate} to ${endDate}`;
//       } else if (filters.filters.IsActive) {
//         listBy = `${filters.filters.IsActive ? 'Active List' : 'InActive List'}`;
//       } else {
//         listBy = 'All List';
//       }
//     }
//     textWidth = doc.getStringUnitWidth(listBy) * fontSize;
//     xCoordinate = doc.internal.pageSize.getWidth() - right - textWidth - 40;
//     doc.text(listBy, xCoordinate, top + 85);

//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     });
//     const currentDateWidth = doc.getStringUnitWidth(currentDate) * fontSize;
//     const currentDateXCoordinate = doc.internal.pageSize.getWidth() - right - currentDateWidth - 40;
//     doc.text(currentDate, currentDateXCoordinate, top + 55);

//     const columns: string[] = Object.keys(data[0]);

//     const formatDate = (data: any) => {
//       return data.map((item: any) => {
//         const createdDate = new Date(item.CreatedOn).toLocaleString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: '2-digit',
//           // hour: '2-digit',
//           // minute: '2-digit',
//         });
//         const modifiedDate = new Date(item.ModifiedOn).toLocaleString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: '2-digit',
//           // hour: '2-digit',
//           // minute: '2-digit',
//         });
//         return {
//           ...item,
//           CreatedOn: createdDate,
//           ModifiedOn: modifiedDate,
//         };
//       });
//     };
//     const formattedData = formatDate(data);
//     const rows: RowInput[] = formattedData.map((row: any) => Object.values(row));

//     const columnCount = columns.length;
//     const fontSizeMultiplier = 1.5 - columnCount * 0.5;
//     const fontSizeAdjusted = Math.max(9, fontSize * fontSizeMultiplier);
//     const cellWidthAdjusted = Math.min(80, 500 / columnCount);

//     const options: UserOptions = {
//       margin: { top: 100, right: right + 40, bottom: bottom + 40, left: left + 40 },
//       styles: {
//         cellPadding: 2,
//       },
//       headStyles: {
//         minCellHeight: 30,
//         // halign: 'center',
//         valign: 'middle',
//         overflow: 'linebreak',
//         fillColor: [41, 128, 185],
//         textColor: [255, 255, 255],
//         fontSize: columnCount > 9 ? (cellWidthAdjusted / columnCount) * 2 : fontSizeAdjusted,
//       },
//       bodyStyles: {
//         textColor: [0, 0, 0],
//         // halign: 'center',
//         valign: 'middle',
//         overflow: 'linebreak',
//         fontSize: columnCount > 9 ? (cellWidthAdjusted / columnCount) * 2 : fontSizeAdjusted,
//       },
//       theme: 'grid',
//       head: [columns],
//       body: rows,
//       startY: top + 150,
//       columnStyles: {} as { [key: string]: any },
//       didParseCell: function (hookData) {
//         if (hookData.column.index !== null && hookData.cell.text) {
//           const cellContentWidth =
//             doc.getStringUnitWidth(hookData.cell.text.toString()) * fontSizeAdjusted;
//           if (cellContentWidth > cellWidthAdjusted) {
//             hookData.cell.styles.cellWidth = cellWidthAdjusted;
//             hookData.cell.styles.overflow = 'linebreak';
//             const splitText = doc.splitTextToSize(hookData.cell.text.toString(), cellWidthAdjusted);
//             hookData.cell.text = splitText.join('\n');
//           }
//         }
//       },
//     };

//     if (!options.columnStyles) {
//       options.columnStyles = {};
//     }
//     columns.forEach((column, index) => {
//       options.columnStyles![index.toString()] = { cellWidth: 'auto' };
//     });

//     autoTable(doc, options);

//     doc.save(`${fileName}.pdf`);
//   } else {
//     console.error('Margins not provided!');
//   }
// }

///final
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
  console.log('data', data, loginUser);

  if (margin) {
    const { top = 40, right = 40, bottom = 40, left = 40 } = margin;

    // Content Area Dimensions
    const contentWidth = doc.internal.pageSize.getWidth() - left - right;
    const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

    // Add Company Logo
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
    const listByWidthWidthXCoordinate = doc.internal.pageSize.getWidth() - right - listByWidth;
    doc.text(listBy, listByWidthWidthXCoordinate, top + 60);

    // Prepare Table Data
    const columns: string[] = Object.keys(data[0]);
    const formatDate = (data: any) =>
      data.map((item: any) => ({
        ...item,
        CreatedOn: new Date(item.CreatedOn).toLocaleDateString(),
        ModifiedOn: new Date(item.ModifiedOn).toLocaleDateString(),
        DueDate: new Date(item.DueDate).toLocaleDateString(),
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
        cellPadding: 2,
      },
      headStyles: {
        minCellHeight: 20,
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
}

// export function exportToPDF(
//   data: any[],
//   header: string,
//   fileName: string,
//   loginUser: any,
//   filters: any,
//   orientation: 'p' | 'portrait' | 'l' | 'landscape',
//   size: string,
//   margin: { top: number; right: number; bottom: number; left: number } = { top: 50, right: 50, bottom: 50, left: 100 }
// ) {
//   const doc = new jsPDF(orientation, 'pt', size);

//   const { top, right, bottom, left } = margin;

//   // Content Area Dimensions
//   const contentWidth = doc.internal.pageSize.getWidth() - left - right;
//   const contentHeight = doc.internal.pageSize.getHeight() - top - bottom;

//   // Add Company Logo
//   const logoWidth = 60;
//   const logoHeight = 60;
//   const centerX = contentWidth / 2 + left - logoWidth / 2;
//   doc.addImage(
//     require('../images/sazsgrey.png'),
//     'jpeg',
//     centerX,
//     top,
//     logoWidth,
//     logoHeight
//   );

//   // Add Header Information
//   doc.setFontSize(18);
//   doc.text(loginUser.CompanyName || 'Admin', left+50, top + 30);

//   doc.setFontSize(10);
//   doc.setTextColor('gray');
//   doc.text(loginUser.Address1 || '', left+50, top + 50);
//   doc.text('City, State, ZIP', left+50, top + 65);
//   doc.text(loginUser.MobileNo || '', left+50, top + 80);

//   // Add File Name and Current Date
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });
//   doc.text(fileName, contentWidth + left - 100, top + 30);
//   doc.text(currentDate, contentWidth + left - 100, top + 50);

//   // Add Filters
//   let listBy = '';
//   if (filters.filters) {
//     if (filters.filters.CreatedOn[0] && filters.filters.CreatedOn[1]) {
//       const startDate = new Date(filters.filters.CreatedOn[0]).toLocaleDateString();
//       const endDate = new Date(filters.filters.CreatedOn[1]).toLocaleDateString();
//       listBy = `From: ${startDate} to ${endDate}`;
//     } else if (filters.filters.IsActive) {
//       listBy = `${filters.filters.IsActive ? 'Active List' : 'Inactive List'}`;
//     } else {
//       listBy = 'All List';
//     }
//   }
//   doc.text(listBy, contentWidth + left - 100, top + 70);

//   // Prepare Table Data
//   const columns: string[] = Object.keys(data[0]);
//   const formatDate = (data: any) =>
//     data.map((item: any) => ({
//       ...item,
//       CreatedOn: new Date(item.CreatedOn).toLocaleDateString(),
//       ModifiedOn: new Date(item.ModifiedOn).toLocaleDateString(),
//     }));
//   const formattedData = formatDate(data);
//   const rows: RowInput[] = formattedData.map((row: any) => Object.values(row));

//   // Dynamic Table Configuration
//   const columnCount = columns.length;
//   const maxColumnWidth = 80;
//   const minColumnWidth = 20;

//   // Calculate column width dynamically
//   const columnWidth =
//     columnCount * maxColumnWidth > contentWidth
//       ? Math.max(minColumnWidth, contentWidth / columnCount)
//       : maxColumnWidth;

//   // Adjust font size based on column count
//   const fontSizeAdjusted = Math.max(7, Math.min(12, 500 / (columnCount * 5)));

//   const options: UserOptions = {
//     margin: { top: top + 150 },
//     styles: {
//       fontSize: fontSizeAdjusted,
//       cellPadding: 2,
//     },
//     headStyles: {
//       minCellHeight: 20,
//       valign: 'middle',
//       overflow: 'linebreak',
//       fillColor: [41, 128, 185],
//       textColor: [255, 255, 255],
//       fontSize: fontSizeAdjusted,
//     },
//     bodyStyles: {
//       textColor: [0, 0, 0],
//       valign: 'middle',
//       overflow: 'linebreak',
//       fontSize: fontSizeAdjusted,
//     },
//     columnStyles: {},
//     head: [columns],
//     body: rows,
//     startY: top + 100,
//     tableWidth: columnWidth * columnCount > contentWidth ? 'wrap' : 'auto',
//   };

//   // Dynamically set column width
//   columns.forEach((column, index) => {
//     options.columnStyles![index.toString()] = { cellWidth: columnWidth };
//   });

//   // Render the Table
//   autoTable(doc, options);

//   // Save the PDF
//   doc.save(`${fileName}.pdf`);
// }

export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  // XLSX.utils.sheet_add_aoa(worksheet, [header.split(',')], { origin: -1 });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
