import { z } from 'zod';
import { messages } from 'config/messages';

export const DocsFormSchema = z.object({
  LoanId: z.coerce.string().min(1, { message: 'Select Customer' }),
  Insurance: z.boolean(),
  OriginalRC: z.boolean(),
  DuplicateKey: z.boolean(),
});

export type DocsFormFieldTypes = z.infer<typeof DocsFormSchema>;

export interface Docs extends DocsFormFieldTypes {
  Id?: string;
}
