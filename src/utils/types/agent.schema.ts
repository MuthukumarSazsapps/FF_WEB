import { z } from 'zod';
import { messages } from 'config/messages';

export const AgentFormSchema = z.object({
  AgentName: z.string().min(1, { message: messages.nameIsRequired }),
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  AgentPhoneNumber: z
    .string()
    .min(1, { message: messages.mobileNoRequired })
    .min(10, { message: messages.mobileNoLengthMin }),
  CityId: z.string().min(1, { message: messages.cityIdRequired }),
  IsActive: z.string(),
});

export type AgentFormFieldTypes = z.infer<typeof AgentFormSchema>;

export interface Agent extends AgentFormFieldTypes {
  Id?: string;
}

export const AgentFormDefaultValues = {
  AgentName: '',
  AgentPhoneNumber: '',
  BranchId: '',
  CityId: '',
  IsActive: '1',
};
