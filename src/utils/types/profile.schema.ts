import { z } from 'zod';
import { messages } from 'config/messages';
import { fileSchema, validateEmail } from 'utils/types/common-rules';

// form zod validation schema
export const profileFormSchema = z.object({
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
  // NoOfBranches: z
  //   .string()
  //   .min(1, { message: messages.NoOfBranchesRequired })
  //   .min(10, { message: messages.NoOfBranchesLengthMin }),
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
    .min(15, { message: messages.gstNoLength }),
  PointOfContact: z
    .string()
    .min(1, { message: messages.pointOfContactRequired })
    .min(6, { message: messages.pointOfContactLengthMin }),
  // ImageUrl: z.string(),
});

// generate form types from zod validation schema
export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export const profileFormDefaultValues = {
  SubscriberName: '',
  ShortName: '',
  CompanyName: '',
  // NoOfBranches: '',
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
  // ImageUrl: new File([], 'temp.txt'),
};
