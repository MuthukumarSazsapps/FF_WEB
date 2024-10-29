import { z } from 'zod';
import { messages } from 'config/messages';

export const LedgerGroupFormSchema = z.object({
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  LedgerGroupName: z.string().min(1, { message: messages.ledgerGroupNameRequired }),
  Description: z.string().optional(),
  IsActive: z.string(),
});

export type LedgerGroupFormFieldTypes = z.infer<typeof LedgerGroupFormSchema>;

export const LedgerGroupFormDefaultValues = {
  BranchId: '',
  LedgerGroupName: '',
  Description: '',
  IsActive: '1',
};

export interface LedgerGroup extends LedgerGroupFormFieldTypes {
  Id?: string;
}
