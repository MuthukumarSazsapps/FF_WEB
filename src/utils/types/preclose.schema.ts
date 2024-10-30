import { string, z } from 'zod';
import { messages } from 'config/messages';

export const PrecloseFormSchema = z.object({
  LoanId: z.coerce.string().min(1, { message: 'Select Customer' }),
  Interest: z.coerce.number().min(1, { message: messages.InterestRequired }),
});

export type PrecloseFormFieldTypes = z.infer<typeof PrecloseFormSchema>;

export interface Preclose extends PrecloseFormFieldTypes {
  Id?: string;
}
export const PrecloseFormDefaultValues = {
  LoanId: '',
  Interest: undefined,
};
