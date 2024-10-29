import { z } from 'zod';
import { messages } from 'config/messages';

export const LedgerFormSchema = z.object({
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  LedgerGroupId: z.string().min(1, { message: messages.selectLedgerGroupNameRequired }),
  LedgerType: z.string().min(1, { message: messages.selectLedgerGroupNameRequired }),
  LedgerName: z.string().min(1, { message: messages.ledgerNameRequired }),
  BalanceAmount: z.string().min(1, { message: messages.ledgerOpeningBalance }),
  Description: z.string().optional(),
  IsActive: z.string(),
});

export type LedgerFormFieldTypes = z.infer<typeof LedgerFormSchema>;

export const LedgerFormDefaultValues = {
  BranchId: '',
  LedgerGroupId: '',
  LedgerName: '',
  LedgerType: '',
  BalanceAmount: '0',
  Description: '',
  IsActive: '1',
};

export interface Ledger extends LedgerFormFieldTypes {
  Id?: string;
}
