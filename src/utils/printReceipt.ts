import dayjs from 'dayjs';
import { LiaCrossSolid } from 'react-icons/lia';

export const handlePrint = (record: any) => {
  console.log('record', record);

  // Create a temporary canvas element for generating the barcode
  const canvas = document.createElement('canvas');

  // Get the current date and time
  const currentDate = dayjs().format('YYYY-MM-DD');
  const currentTime = dayjs().format('hh:mm:ss A');

  // Prepare the HTML content for the receipt
  const receiptHTML = `
      <html>
        <head>
          <title>WeighMent Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 10px; /* Set smaller font size for thermal printer */
              margin: 0;
              padding: 0;
            }
            .image-icon{
              display: flex;
              gap:10px;
              justify-content: center;
              align-items:center
            
            }
            .receipt-container {
              width: 80mm; /* For 58mm thermal paper */
              padding: 5mm;
              text-align: center;
              border: 1px solid black; /* Keep the border */
              position: relative;
              box-sizing: border-box;
              overflow: hidden; /* Ensure the barcode doesn't overflow */
            }
            h2 {
              margin: 10px 0;
              font-size: 14px;
            }
            .info-row {
              margin-bottom: 5px;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
            }
            .info-row strong {
              text-align: left;
            }
            .date {
              position: absolute;
              top: 5px;
              left: 5px;
              font-size: 10px;
            }
            .time {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 10px;
            }
            .barcode {
              margin: 10px 0;
              display: inline-block;
              word-wrap: break-word; /* Wrap the barcode within the container */
              max-width: 100%; /* Ensure barcode doesn't exceed the container width */
            }
            .barcode img {
              max-width: 100%;
              height: auto;
            }
            .description {
              margin-top: 10px;
              border-top: 1px solid #000;
              padding-top: 5px;
              font-size: 10px;
              text-align: left;
            }
  
            /* Media query for A4 and A5 paper sizes */
            @media print and (min-width: 210mm) {
              .receipt-container {
                width: auto; /* Use full width for A4 and A5 */
                padding: 20mm;
              }
              body {
                font-size: 12px; /* Adjust font size for larger paper */
              }
              h2 {
                font-size: 18px;
              }
              .info-row {
                font-size: 12px;
              }
              .date, .time {
                font-size: 12px;
              }
              .description {
                font-size: 12px;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="date">${currentDate}</div>
            <div class="time">${currentTime}</div>
            <div class="image-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 100 100"
                fill="none"
            >
              <g transform="rotate(30, 50, 50)" filter="url(#inset-shadow)">
                <rect x="40" y="0" width="20" height="100" fill="black" stroke="black" stroke-width="2"  />
                <rect x="0" y="30" width="100" height="20" fill="black" stroke="black" stroke-width="2"  />
                </g>
            </svg>

            <h2>AMALI FINANCE</h2>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 100 100"
                fill="none"
            >
                <g transform="rotate(-30, 50, 50)" filter="url(#inset-shadow)">
                <rect x="40" y="0" width="20" height="100" fill="black" stroke="black" stroke-width="2"  />
                <rect x="0" y="30" width="100" height="20" fill="black" stroke="black" stroke-width="2"  />
                </g>
            </svg>
            </div>
            <p style="position: relative; top: -20px;">~~ <strong>Ave Maria</strong> ~~</p>
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
                <strong>Loan Amount:</strong> <span>${record.LoanAmount}</span>
              </div>
            <div class="info-row">
              <strong>EMI Amount:</strong> <span>${record.EmiAmount}</span>
            </div>
            <div class="info-row">
                <strong>Installment No:</strong> <span>${record.Installment}</span>
              </div>
            <div class="info-row">
              <strong>Payment Status:</strong> <span>${record.Remarks}</span>
            </div>
            <div class="description">
                "நன்றி,<Strong>அமலி ஃபைனான்ஸ்</Strong> தேர்வு செய்ததற்கு!
                உங்கள் நம்பிக்கை எங்கள் பொறுப்பை ஊக்குவிக்கிறது, உங்கள் கனவுகளை நனவாக்க.
                ஒவ்வொரு கட்டத்திலும் உங்களுடன் சேர்ந்து, பிரகாசமான நிதி எதிர்காலத்தை உருவாக்குவோம்.
                ஒரு தவணையில் ஒரு படியாக, முன்னேறுங்கள், செழிக்குங்கள்!"
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
