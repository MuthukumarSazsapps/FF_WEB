import { z } from 'zod';
import { messages } from 'config/messages';

export const DueEntryFormSchema = z
  .object({
    Installment: z.coerce.number(),
    EmiAmount: z.coerce.number(),
    TotalAmount: z.coerce.number().optional(),
    TotalPending: z.coerce.number().optional(),
    TotalLateFees: z.coerce.number(),
    EmiDate: z.string(),
    LateDays: z.coerce.number().optional(),
    LateFees: z.coerce.number().optional(),
    PaidAmount: z.coerce.number().min(1, { message: messages.paidamountRequired }),
    PaidLateFees: z.coerce.number(),
    BalanceAmount: z.coerce.number(),
    PaymentMethod: z.coerce.string().min(1, { message: messages.paymethodRequired }),
    Remarks: z.string().optional(),
  })
  .refine(data => data.PaidLateFees <= data.TotalLateFees, {
    message: 'Late fees cannot be that much',
    path: ['PaidLateFees'],
  })
  .refine(
    data => {
      const isBalanceFullyPaid = data.BalanceAmount <= data.PaidAmount;
      const isLateFeesNotEmpty = data.PaidLateFees > 0;
      if (!isBalanceFullyPaid && isLateFeesNotEmpty) {
        return false;
      }
      return true;
    },
    {
      message: 'Pay the Due Amount Completely before paying late fees',
      path: ['PaidLateFees'],
    },
  );

export type DueEntryFormFieldTypes = z.infer<typeof DueEntryFormSchema>;

export interface DueEntry extends DueEntryFormFieldTypes {
  Id?: string;
}
export const DueEntryFormDefaultValues = {
  Installment: 0,
  EmiAmount: 0,
  EmiDate: '',
  LateDays: 0,
  LateFees: 0,
  TotalLateFees: 0,
  PaidAmount: 0,
  PaidLateFees: 0,
  BalanceAmount: 0,
  PaymentMethod: '',
  Remarks: '',
  TotalAmount: 0,
};
