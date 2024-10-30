import { z } from 'zod';
import { messages } from 'config/messages';
import { validateConfirmPassword, validateEmail, validateNewPassword } from './common-rules';

export const SubscriberFormSchema = z
  .object({
    SubscriberName: z.string().min(1, { message: messages.nameIsRequired }),
    ShortName: z
      .string()
      .min(1, { message: messages.shortNameRequired })
      .min(5, { message: messages.shortNameLengthMin })
      .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: messages.NoSpecialChars }),
    CompanyName: z
      .string()
      .min(1, { message: messages.companyNameRequired })
      .min(3, { message: messages.companyNameLengthMin }),
    NoOfBranches: z
      .string()
      .min(1, { message: messages.NoOfBranchesRequired })
      .refine(value => /^[1-9]+$/.test(value), { message: messages.validnumber }),
    Email: validateEmail,
    UserName: z
      .string()
      .min(1, { message: messages.userNameRequired })
      .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: messages.NoSpecialChars }),
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
      .min(15, { message: messages.gstNoLength })
      .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: messages.NoSpecialChars }),
    Password: validateNewPassword,
    PointOfContact: z
      .string()
      .min(1, { message: messages.pointOfContactRequired })
      .min(4, { message: messages.pointOfContactLengthMin }),
    ConfirmPassword: validateConfirmPassword,
    Logo: z.string(),
    IsActive: z.string(),
    StartDate: z.coerce.date(),
    EndDate: z.coerce.date(),
  })
  .refine(data => data.EndDate > data.StartDate, {
    message: messages.endDateCondition,
    path: ['endDate'],
  })
  .refine(data => data.Password === data.ConfirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['ConfirmPassword'],
  });

export type SubscriberFormFieldTypes = z.infer<typeof SubscriberFormSchema>;

export interface Subscriber extends SubscriberFormFieldTypes {
  Id?: string;
}

export const subscriberFormDefaultValues = {
  SubscriberName: '',
  ShortName: '',
  CompanyName: '',
  NoOfBranches: '1',
  Email: '',
  UserName: '',
  MobileNo: '',
  LandLineNo: '',
  Address1: '',
  Address2: '',
  LandMark: '',
  CityId: '',
  GstNo: '',
  PointOfContact: '',
  IsActive: '1',
  Password: '',
  ConfirmPassword: '',
  Logo: new File([], 'temp.txt'),
  StartDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
  EndDate: new Date(new Date().valueOf() + 1000 * 3600 * 48),
};
