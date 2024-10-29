import { z } from 'zod';
import { messages } from 'config/messages';

export const PaymentsFormSchema = z.object({
  LoanId: z.string().min(1, { message: 'Required' }),
  PayAmount: z.coerce.string().min(1, { message: 'Required' }),
  ByLedgerCode: z.string().min(1, { message: 'Required' }),
  PaymentDate: z.coerce.date(),
  Particulars: z.string().optional(),
  Remarks: z.string().optional(),
});

export type PaymentsFormFieldTypes = z.infer<typeof PaymentsFormSchema>;

export const PaymentsFormDefaultValues = {
  LoanId: '',
  PayAmount: '',
  ByLedgerCode: '',
  PaymentDate: new Date(),
  Particulars: 'Loan Disbursement',
  Remarks: '',
};

export interface Payments extends PaymentsFormFieldTypes {
  CityId: string;
}
