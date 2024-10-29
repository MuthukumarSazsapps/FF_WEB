import { z } from 'zod';
import { messages } from 'config/messages';

export const PendingremarksFormSchema = z.object({
  Remarks: z.string().min(1, { message: messages.addressIsRequired }),
});

export type PendingRemarksFormFieldTypes = z.infer<typeof PendingremarksFormSchema>;

export const PendingRemarksFormDefaultValues = {
  Remarks: '',
};

export interface PendingRemarks extends PendingRemarksFormFieldTypes {
  LoanId?: string;
  Installment?: number;
}
