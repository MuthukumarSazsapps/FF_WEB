import dayjs from 'dayjs';
import { LiaCrossSolid } from 'react-icons/lia';

export const handlePrint = (record: any) => {
  console.log('record', record);

  // Create a temporary canvas element for generating the barcode
  const canvas = document.createElement('canvas');

  // Get the current date and time
  const currentDate = dayjs().format('YYYY-MM-DD');
  const currentTime = dayjs().format('hh:mm:ss A');
  const EmiDate = dayjs(record.EmiDate).format('YYYY-MM-DD');
  const ReceiptTime = dayjs(record.ReceiptDate).format('hh:mm:ss A');

  // Prepare the HTML content for the receipt
  const receiptHTML = `
     <html>
  <head>
    <title>EMI Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 12px; /* Adjusted for thermal printer */
        margin: 0;
        padding: 0;
      }

      .receipt-container {
        width: 58mm; /* Adjusted for 58mm thermal paper */
        padding: 2mm;
        text-align: center;
        box-sizing: border-box;
      }

      h2 {
        margin: 5px 0;
        font-size: 12px;
      }

      .info-row {
        margin: 3px 0;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
      }

      .info-row strong {
        text-align: left;
      }

      .date,
      .time {
        font-size: 9px;
        text-align: left;
        display: inline-block;
      }

      .barcode {
        margin: 5px 0;
        display: inline-block;
        word-wrap: break-word; /* Ensure it fits within the container */
      }

      .description {
        margin-top: 5px;
        border-top: 1px solid #000;
        padding-top: 3px;
        font-size: 9px;
        text-align: left;
      }

      .image-icon {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
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
      <div class="date">${currentDate}</div>
      <div class="time">${currentTime}</div>
      <div class="image-icon">
        <h2>AMALI Auto FINANCE</h2>  
      </div>
      <p style="position: relative; top: -10px;">924-B2 Main Road ,Kovilpatti</p>
      <div class="info-row">
        <strong>Customer Id:</strong> <span>${record.CustomerId}</span>
      </div>
      <div class="info-row">
        <strong>Customer Name:</strong> <span>${record.CustomerName}</span>
      </div>
      <div class="info-row">
        <strong>Loan Id:</strong> <span>${record.LoanId}</span>
      </div>
      <div class="info-row">
        <strong>Loan Amount:</strong> <span>₹ ${record.LoanAmount}</span>
      </div>
      <div class="info-row">
        <strong>EMI Amount:</strong> <span>₹ ${record.EmiAmount}</span>
      </div>
      <div class="info-row">
        <strong>Installment No:</strong> <span>${record.Installment}</span>
      </div>
      <div class="info-row">
        <strong>Payment Status:</strong> <span>${record.Remarks}</span>
      </div>
      <div class="info-row">
        <strong>Due Date:</strong> <span>${EmiDate}</span>
      </div>
      <div class="info-row">
        <strong>Receipt Date:</strong> <span>${ReceiptTime}</span>
      </div>
      <div class="info-row">
        <strong>Late Days:</strong> <span>${record.LateDays}</span>
      </div>
      <div class="info-row">
        <strong>Late Fees:</strong> <span>${record.LateFees}</span>
      </div>
      <div class="info-row">
        <strong>Balance To Be Paid:</strong> <span>${record.BalanceAmount}</span>
      </div>
      <div class="description">
        "நன்றி,<strong>அமலி ஃபைனான்ஸ்</strong> தேர்வு செய்ததற்கு! உங்கள் நம்பிக்கை எங்கள் பொறுப்பை ஊக்குவிக்கிறது. உங்கள் கனவுகளை நனவாக்க. ஒவ்வொரு கட்டத்திலும் உங்களுடன் சேர்ந்து, பிரகாசமான நிதி எதிர்காலத்தை உருவாக்குவோம்."
      </div>
    </div>
  </body>
</html>

    `;

  // Open the print window and write the receipt content
  // Open the print window and write the receipt content
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait until the content is loaded before printing
    printWindow.onload = function () {
      printWindow.print();
    };

    // Cleanup the canvas element
    canvas.remove();
  } else {
    console.error('Failed to open the print window. The pop-up might have been blocked.');
  }
};
