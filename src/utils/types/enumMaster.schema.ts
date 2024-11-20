import { z } from 'zod';
import { messages } from 'config/messages';

export const EnumMasterFormSchema = z.object({
  FlagType: z.string().min(1, { message: messages.vehicleNameRequired }),
  TypeName: z.string().min(1, { message: messages.branchRequired }),
});

export type EnumMasterFormFieldTypes = z.infer<typeof EnumMasterFormSchema>;

export interface EnumMaster extends EnumMasterFormFieldTypes {
  Id?: string;
}

export const EnumMasterFormDefaultValues = {
  FlagType: '',
  TypeName: ''
};



