import { z } from 'zod';
import { messages } from 'config/messages';

export const CityFormSchema = z.object({
  CityName: z.string().min(1, { message: messages.cityIdRequired }),
  StateId: z.string().min(1, { message: messages.stateIsRequired }),
  Pincode: z.string().min(6, { message: messages.pincodeRequired }),
  IsActive: z.string(),
});

export type CityFormFieldTypes = z.infer<typeof CityFormSchema>;

export const CityFormDefaultValues = {
  CityName: '',
  Pincode: '',
  StateId: '',
  IsActive: '1',
};

export interface City extends CityFormFieldTypes {
  Id?: string;
}
