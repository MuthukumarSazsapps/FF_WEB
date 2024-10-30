import { z } from 'zod';
import { messages } from 'config/messages';

export const SubCityFormSchema = z.object({
  CityName: z.string().min(1, { message: messages.cityIdRequired }),
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  Pincode: z
    .string()
    .min(1, { message: messages.pincodeRequired })
    .min(6, { message: messages.pincodelengthRequired }),
  StateId: z.string().min(1, { message: messages.stateIsRequired }),
  IsActive: z.string(),
});

export type SubCityFormFieldTypes = z.infer<typeof SubCityFormSchema>;

export const SubCityFormDefaultValues = {
  CityName: '',
  Pincode: '',
  BranchId: '',
  StateId: '',
  IsActive: '1',
};

export interface SubCity extends SubCityFormFieldTypes {
  Id?: string;
}
