import { z } from 'zod';
import { messages } from 'config/messages';

export const BranchFormSchema = z.object({
  BranchName: z.string().min(1, { message: messages.nameIsRequired }),
  MobileNo: z
    .string()
    .min(1, { message: messages.mobileNoRequired })
    .min(10, { message: messages.mobileNoLengthMin }),
  Address1: z
    .string()
    .min(1, { message: messages.addressIsRequired })
    .min(20, { message: messages.addressIsLengthMin }),
  Address2: z.string().optional(),
  LandMark: z.string().optional(),
  LandLineNo: z.string().optional(),
  CityId: z.string().min(1, { message: messages.cityIdRequired }),
  GstNo: z
    .string()
    .min(1, { message: messages.gstNoRequired })
    .min(15, { message: messages.gstNoLength }),
  IsActive: z.string(),
});

export type BranchFormFieldTypes = z.infer<typeof BranchFormSchema>;

export interface Branch extends BranchFormFieldTypes {
  Id?: string;
}

export const BranchFormDefaultValues = {
  BranchName: '',
  MobileNo: '',
  LandLineNo: '',
  Address1: '',
  Address2: '',
  LandMark: '',
  CityId: '',
  GstNo: '',
  IsActive: '1',
};
