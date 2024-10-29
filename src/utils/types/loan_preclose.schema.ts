import { string, z } from 'zod';
import { messages } from 'config/messages';

export const PrecloseLoanFormSchema = z
  .object({
    LoanId: z.coerce.string().min(1, { message: 'Select Customer' }),
    PendingCapital: z.coerce.number().min(1, { message: messages.InterestRequired }),
    LoanAmount: z.coerce.number(),
    PendingEmi: z.coerce.number(),
    PrecloseAmount: z.coerce.number().min(1, { message: messages.InterestRequired }),
    Savings: z.coerce.number(),
    PaidAmount: z.coerce.number().min(1, { message: messages.InterestRequired }),
    PaymentMethod: z.string().min(1, { message: messages.paymethodRequired }),
    Remarks: z.string().min(1, { message: messages.Required }),
  })
  .refine(data => data.PendingCapital <= data.PaidAmount, {
    message: messages.entervalidPrecloseAmount,
    path: ['PaidAmount'],
  });

export type PrecloseLoanFormFieldTypes = z.infer<typeof PrecloseLoanFormSchema>;

export interface PrecloseLoan extends PrecloseLoanFormFieldTypes {
  Id?: string;
  PaidEmiAmount?: string;
  AnyPartialEmi?: string;
  TotalDays?: string;
}
export const PrecloseLoanFormDefaultValues = {
  LoanId: '',
  PendingCapital: 0,
  LoanAmount: 0,
  PrecloseAmount: 0,
  Savings: 0,
  PaidAmount: 0,
  PaymentMethod: '',
  Remarks: '',
  PaidEmiAmount: '',
  AnyPartialEmi: '',
  TotalDays: '',
};
