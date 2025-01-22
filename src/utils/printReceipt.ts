// import dayjs from 'dayjs';
// import { LiaCrossSolid } from 'react-icons/lia';

// export const handlePrint = (record: any) => {
//   console.log('record', record);

//   // Create a temporary canvas element for generating the barcode
//   const canvas = document.createElement('canvas');

//   // Get the current date and time
//   const currentDate = dayjs().format('DD-MM-YYYY');
//   const currentTime = dayjs().format('hh:mm:ss A');
//   const EmiDate = dayjs(record.EmiDate).format('DD-MM-YYYY');
//   const ReceiptDate = dayjs(record.ReceiptDate).format('DD-MM-YYYY');

//   // Prepare the HTML content for the receipt
//   const receiptHTML = `
//     <html>
//   <head>
//     <title>EMI Receipt</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         font-size: 18px; /* Adjusted for thermal printer */
//         margin: 0;
//         padding: 0;
//       }

//       .receipt-container {
//         width: 71mm; /* Adjusted for 58mm thermal paper */
//         padding: 0px;
//         text-align: center;
//         box-sizing: border-box;
//         font: icon;
//         border: 2px solid #000;
//       }

//       h2 {
//         margin:0;
//         font-size: 18px;
//       }

//       .info-row {
//         margin: 3px 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 12px;
//       }
//       .info-row1 {
//         margin: 0;
//         padding: 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 12px;
//       }

//       .address{
//         margin: 0;
//         padding: 0;
//         font-size: 12px;
//       }
//       .detail{
//         border-bottom:   1px dashed #000;
//         margin: 0 0 5px 0;
//         padding: 0;
//       }
//       .info-row strong {
//         text-align: left;
//       }

//       .datetime{
//         margin: 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 9px;
//       }

//       .barcode {
//         margin: 5px 0;
//         display: inline-block;
//         word-wrap: break-word; /* Ensure it fits within the container */
//       }

//       .description {
//         margin-top: 5px;
//         border-top:   1px dashed #000;
//         padding-top: 3px;
//         font-size: 9px;
//         text-align: left;
//       }

//       .image-icon {
//         display: flex;
//         gap: 5px;
//         justify-content: center;
//         align-items: center;
//         margin: 0px;
//       }

//       /* Media query for larger paper sizes */
//       @media print and (min-width: 210mm) {
//         .receipt-container {
//           width: auto;
//         }
//         body {
//           font-size: 22px;
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <div class="receipt-container">
//       <div class="datetime">
//         <p>${currentDate}</p>
//         <p>${currentTime}</p>
//       </div>
//       <!-- <div class="date"></div>
//       <div class="time"></div> -->
//       <div class="image-icon">
//         <h2>AMALI AUTO FINANCE</h2>
//       </div>
//       <div class="detail">
//         <p class="address">924-B2 Main Road,Kovilpatti</p>
//         <div class="info-row1">
//           <p> <strong>Cell</strong>  : 9994994953</p> <p> <b>PH</b> : 04632-234996</p>
//         </div>
//       <h2>Cash Receipt</h2>
//       </div>
//       <div class="info-row">
//         <label>Reciept No:</label> <span>${record.ReceiptNo}</span>
//       </div>
//       <div class="info-row">
//         <label>Loan Account:</label> <span>${record.LoanId}</span>
//       </div>
//       <div class="info-row">
//         <label>Customer Id:</label> <span>${record.CustomerId}</span>
//       </div>
//       <div class="info-row">
//         <label>Customer Name:</label> <span>${record.CustomerName}</span>
//       </div>
//        <div class="info-row">
//         <label>Vehicle No:</label> <span>${record.RegisterNumber}</span>
//       </div>
//       <div class="info-row">
//         <label>Installment No:</label> <span>${record.Installment}/${record.Tenure}</span>
//       </div>
//       <div class="info-row">
//         <label>EMI Amount:</label> <span>₹ ${record.EmiAmount}</span>
//       </div>
//       <div class="info-row">
//         <label>Due Date:</label> <span>${EmiDate}</span>
//       </div>
//       <div class="info-row">
//         <label>Receipt Date:</label> <span>${ReceiptDate}</span>
//       </div>
//       <div class="info-row">
//         <label>Late Days:</label> <span>${record.LateDays}</span>
//       </div>
//       <div class="info-row">
//         <label>Late Fees:</label> <span>${record.LateFees}</span>
//       </div>
//       <div class="info-row">
//         <label>Balance To Be Paid:</label> <span>${record.BalanceAmount}</span>
//       </div>
//        <div class="info-row">
//         <label>Payment Status:</label> <span>${record.Remarks}</span>
//       </div>
//       <div class="description">
//         " ,<strong>அமலி ஃபைனான்ஸ்</strong> தேர்வு செய்ததற்கு! உங்கள் நம்பிக்கை எங்கள் பொறுப்பை ஊக்குவிக்கிறது. உங்கள் கனவுகளை நனவாக்க. ஒவ்வொரு கட்டத்திலும் உங்களுடன் சேர்ந்து, பிரகாசமான நிதி எதிர்காலத்தை உருவாக்குவோம்."
//       </div>
//     </div>
//   </body>
// </html>

//     `;

//   // Open the print window and write the receipt content
//   // Open the print window and write the receipt content
//   const printWindow = window.open('', '_blank');

//   if (printWindow) {
//     printWindow.document.write(receiptHTML);
//     printWindow.document.close();

//     // Wait until the content is loaded before printing
//     printWindow.onload = function () {
//       printWindow.print();
//     };

//     // Cleanup the canvas element
//     canvas.remove();
//   } else {
//     console.error('Failed to open the print window. The pop-up might have been blocked.');
//   }
// };

import dayjs from 'dayjs';
import { LiaCrossSolid } from 'react-icons/lia';

export const handlePrint = (record: any) => {
  console.log('record', record);

  // Get the current date and time
  const currentDate = dayjs().format('DD-MM-YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');
  const EmiDate = dayjs(record.EmiDate).format('DD-MM-YYYY');
  const ReceiptDate = dayjs(record.ReceiptDate).format('DD-MM-YYYY');

  // Prepare the HTML content for the receipt
  const receiptHTML = `
  <html>
  <head>
    <title>EMI Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 18px; /* Adjusted for thermal printer */
        margin: 0;
        padding: 0;
      }

      .receipt-container {
        width: 71mm; /* Adjusted for 58mm thermal paper */
        padding: 10px;
        text-align: center;
        box-sizing: border-box;
        border: 2px solid #000;
        position: relative;
        overflow: hidden;
      }

      /* Watermark background logo */
      .receipt-container::before {
        content: "";
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url('https://sazs-public-logos.s3.ap-south-1.amazonaws.com/amali.png'); /* Replace with your logo URL or base64 */
        background-size: 100%; /* Adjust size as needed */
        background-repeat: no-repeat;
        opacity: 50.3; /* Makes it look like a watermark */
        width: 100%; /* Adjust width */
        height: 100%; /* Adjust height */
        z-index: -1;
      }

      h2 {
        margin: 0;
        font-size: 18px;
      }

      .info-row {
        margin: 3px 0;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }

      .info-row1 {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }

      .address {
        margin: 0;
        padding: 0;
        font-size: 12px;
      }

      .detail {
        border-bottom: 1px dashed #000;
        margin: 0 0 5px 0;
        padding: 0;
      }

      .info-row strong {
        text-align: left;
      }

      .datetime {
        margin: 0;
        display: flex;
        justify-content: space-between;
        font-size: 9px;
      }

      .barcode {
        margin: 5px 0;
        display: inline-block;
        word-wrap: break-word; /* Ensure it fits within the container */
      }

      .description {
        margin-top: 5px;
        border-top: 1px dashed #000;
        padding-top: 3px;
        font-size: 9px;
        text-align: left;
      }

      .image-icon {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
        margin: 0px;
      }

      /* Media query for larger paper sizes */
      @media print and (min-width: 210mm) {
        .receipt-container {
          width: auto;
        }
        body {
          font-size: 22px;
        }
      }
    </style>
  </head>
  <body>
    <div class="receipt-container">
      <div class="datetime">
        <p>${currentDate}</p>
        <p>${currentTime}</p>
      </div>
      <div class="image-icon">
        <h2>AMALI AUTO FINANCE</h2>
      </div>
      <div class="detail">
        <p class="address">GST.NO-33AFLPM6353A1ZP</p>
        <p class="address">924-B2 Main Road, Kovilpatti</p>
        <div class="info-row1">
          <p><strong>Cell</strong>: 9994994953</p>
          <p><b>PH</b>: 04632-234996</p>
        </div>
        <h2>Cash Receipt</h2>
      </div>
      <div class="info-row">
        <label>Receipt No:</label> <span>${record.ReceiptNo}</span>
      </div>
      <div class="info-row">
        <label>Loan Account:</label> <span>${record.LoanId}</span>
      </div>
      <div class="info-row">
        <label>Customer Name:</label> <span>${record.CustomerName}</span>
      </div>
      <div class="info-row">
        <label>Vehicle No:</label> <span>${record.RegisterNumber}</span>
      </div>
      <div class="info-row">
        <label>Installment No:</label> <span>${record.Installment}/${record.Tenure}</span>
      </div>
      <div class="info-row">
        <label>EMI Amount:</label> <span>₹ ${record.EmiAmount}</span>
      </div>
      <div class="info-row">
        <label>Due Date:</label> <span>${EmiDate}</span>
      </div>
      <div class="info-row">
        <label>Receipt Date:</label> <span>${ReceiptDate}</span>
      </div>
      <div class="info-row">
        <label>Late Days:</label> <span>${record.LateDays}</span>
      </div>
      <div class="info-row">
        <label>Late Fees:</label> <span>${record.LateFees}</span>
      </div>
      <div class="info-row">
        <label>Balance To Be Paid:</label> <span>${record.BalanceAmount}</span>
      </div>
      <div class="info-row">
        <label>Payment Status:</label> <span>${record.Remarks}</span>
      </div>
      <div class="description">
        "<strong>அமலி ஃபைனான்ஸ்</strong> தேர்வு செய்ததற்கு நன்றி! உங்கள் நம்பிக்கை எங்கள் பொறுப்பை ஊக்குவிக்கிறது. உங்கள் கனவுகளை நனவாக்க, ஒவ்வொரு கட்டத்திலும் உங்களுடன் சேர்ந்து, பிரகாசமான நிதி எதிர்காலத்தை உருவாக்குவோம்."
      </div>
    </div>
  </body>
</html>
  `;

  // Open the print window and write the receipt content
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait until the content is loaded before printing
    printWindow.onload = function () {
      printWindow.print();
    };
  } else {
    console.error('Failed to open the print window. The pop-up might have been blocked.');
  }
};

// import dayjs from 'dayjs';
// import { LiaCrossSolid } from 'react-icons/lia';

// export const handlePrint = (record: any) => {
//   console.log('record', record);

//   // Get the current date and time
//   const currentDate = dayjs().format('DD-MM-YYYY');
//   const currentTime = dayjs().format('hh:mm:ss A');
//   const EmiDate = dayjs(record.EmiDate).format('DD-MM-YYYY');
//   const ReceiptDate = dayjs(record.ReceiptDate).format('DD-MM-YYYY');

//   // Prepare the HTML content for the receipt
//   const receiptHTML = `
//   <html>
//   <head>
//     <title>EMI Receipt</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         font-size: 18px; /* Adjusted for thermal printer */
//         margin: 0;
//         padding: 0;
//       }

//       .receipt-container {
//         width: 71mm; /* Adjusted for 58mm thermal paper */
//         padding: 10px;
//         text-align: center;
//         box-sizing: border-box;
//         border: 2px solid #000;
//         position: relative;
//         overflow: hidden;
//       }

//       /* Background watermark logo */
//       .watermark1{
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-image: url('https://sazs-public-logos.s3.ap-south-1.amazonaws.com/amali.png'); /* Replace with your logo URL or base64 */
//         background-size: 60%; /* Adjust size as needed */
//         background-repeat: no-repeat;
//         background-position: center;
//         opacity: 0.1; /* Makes it look like a watermark */
//         z-index: -1;
//       }
//       .watermark{
//         position: absolute;
//         top: 40%;
//         left: 30%;
//         opacity: 0.5;
//       }

//       h2 {
//         margin: 0;
//         font-size: 18px;
//       }

//       .info-row {
//         margin: 3px 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 12px;
//       }

//       .info-row1 {
//         margin: 0;
//         padding: 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 12px;
//       }

//       .address {
//         margin: 0;
//         padding: 0;
//         font-size: 12px;
//       }

//       .detail {
//         border-bottom: 1px dashed #000;
//         margin: 0 0 5px 0;
//         padding: 0;
//       }

//       .info-row strong {
//         text-align: left;
//       }

//       .datetime {
//         margin: 0;
//         display: flex;
//         justify-content: space-between;
//         font-size: 9px;
//       }

//       .barcode {
//         margin: 5px 0;
//         display: inline-block;
//         word-wrap: break-word; /* Ensure it fits within the container */
//       }

//       .description {
//         margin-top: 5px;
//         border-top: 1px dashed #000;
//         padding-top: 3px;
//         font-size: 9px;
//         text-align: left;
//       }

//       .image-icon {
//         display: flex;
//         gap: 5px;
//         justify-content: center;
//         align-items: center;
//         margin: 0px;
//       }

//       /* Media query for larger paper sizes */
//       @media print and (min-width: 210mm) {
//         .receipt-container {
//           width: auto;
//         }
//         body {
//           font-size: 22px;
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <div class="receipt-container">
//       <img src='https://sazs-public-logos.s3.ap-south-1.amazonaws.com/amali.png' class='watermark' width='100' height='100'/>
//       <div class="watermarkk"></div>
//       <div class="datetime">
//         <p>${currentDate}</p>
//         <p>${currentTime}</p>
//       </div>
//       <div class="image-icon">
//         <h2>AMALI AUTO FINANCE</h2>
//       </div>
//       <div class="detail">
//         <p class="address">GST.NO-33AFLPM6353A1ZP</p>
//         <p class="address">924-B2 Main Road, Kovilpatti</p>
//         <div class="info-row1">
//           <p><strong>Cell</strong>: 9994994953</p>
//           <p><b>PH</b>: 04632-234996</p>
//         </div>
//         <h2>Cash Receipt</h2>
//       </div>
//       <div class="info-row">
//         <label>Receipt No:</label> <span>${record.ReceiptNo}</span>
//       </div>
//       <div class="info-row">
//         <label>Loan Account:</label> <span>${record.LoanId}</span>
//       </div>
//       <div class="info-row">
//         <label>Customer Name:</label> <span>${record.CustomerName}</span>
//       </div>
//       <div class="info-row">
//         <label>Vehicle No:</label> <span>${record.RegisterNumber}</span>
//       </div>
//       <div class="info-row">
//         <label>Installment No:</label> <span>${record.Installment}/${record.Tenure}</span>
//       </div>
//       <div class="info-row">
//         <label>EMI Amount:</label> <span>₹ ${record.EmiAmount}</span>
//       </div>
//       <div class="info-row">
//         <label>Due Date:</label> <span>${EmiDate}</span>
//       </div>
//       <div class="info-row">
//         <label>Receipt Date:</label> <span>${ReceiptDate}</span>
//       </div>
//       <div class="info-row">
//         <label>Late Days:</label> <span>${record.LateDays}</span>
//       </div>
//       <div class="info-row">
//         <label>Late Fees:</label> <span>${record.LateFees}</span>
//       </div>
//       <div class="info-row">
//         <label>Balance To Be Paid:</label> <span>${record.BalanceAmount}</span>
//       </div>
//       <div class="info-row">
//         <label>Payment Status:</label> <span>${record.Remarks}</span>
//       </div>
//       <div class="description">
//         "<strong>அமலி ஃபைனான்ஸ்</strong> தேர்வு செய்ததற்கு நன்றி! உங்கள் நம்பிக்கை எங்கள் பொறுப்பை ஊக்குவிக்கிறது. உங்கள் கனவுகளை நனவாக்க, ஒவ்வொரு கட்டத்திலும் உங்களுடன் சேர்ந்து, பிரகாசமான நிதி எதிர்காலத்தை உருவாக்குவோம்."
//       </div>
//     </div>
//   </body>
// </html>
//   `;

//   // Open the print window and write the receipt content
//   const printWindow = window.open('', '_blank');

//   if (printWindow) {
//     printWindow.document.write(receiptHTML);
//     printWindow.document.close();

//     // Wait until the content is loaded before printing
//     printWindow.onload = function () {
//       printWindow.print();
//     };
//   } else {
//     console.error('Failed to open the print window. The pop-up might have been blocked.');
//   }
// };
