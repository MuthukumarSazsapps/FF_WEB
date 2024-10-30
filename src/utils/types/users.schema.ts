import { z } from 'zod';
import { messages } from 'config/messages';
import { validateConfirmPassword, validateEmail, validateNewPassword } from './common-rules';

export const UserFormSchema = z
  .object({
    DisplayName: z.string().min(1, { message: messages.nameIsRequired }),
    Email: validateEmail,
    BranchId: z.string().min(1, { message: messages.branchRequired }),
    MobileNo: z
      .string()
      .min(1, { message: messages.mobileNoRequired })
      .min(10, { message: messages.mobileNoLengthMin }),
    UserName: z.string().min(1, { message: messages.userNameRequired }),
    Address1: z
      .string()
      .min(1, { message: messages.addressIsRequired })
      .min(20, { message: messages.addressIsLengthMin }),
    Address2: z.string().optional(),
    LandMark: z.string().optional(),
    CityId: z.string().min(1, { message: messages.cityIdRequired }),
    Password: validateNewPassword,
    ConfirmPassword: validateConfirmPassword,
    IsActive: z.string(),
  })
  .refine(data => data.Password === data.ConfirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['ConfirmPassword'],
  });

export type UserFormFieldTypes = z.infer<typeof UserFormSchema>;

export const userFormDefaultValues = {
  DisplayName: '',
  Email: '',
  MobileNo: '',
  BranchId: '',
  Address1: '',
  Address2: '',
  LandMark: '',
  UserName: '',
  Password: '',
  ConfirmPassword: '',
  CityId: '',
  IsActive: '1',
  NoOfBranches: 1,
};

export interface User extends UserFormFieldTypes {
  Id?: string;
  SubscriberId?: string;
  Logo?: string;
  CompanyName?: string;
  ImageURL?: string;
  NoOfBranches: number;
}
