import { z } from 'zod';
import { messages } from 'config/messages';

export const LocationFormSchema = z.object({
  StateName: z.string().min(1, { message: messages.stateIsRequired }),
  StateCode: z.coerce.string().min(1, { message: messages.stateCodeIsRequired }),
  IsActive: z.string(),
});
export type LocationFormFieldTypes = z.infer<typeof LocationFormSchema>;

export const LocationFormDefaultValues = {
  StateName: '',
  StateCode: '',
  IsActive: '1',
};

export interface Location extends LocationFormFieldTypes {
  Id?: string;
}
