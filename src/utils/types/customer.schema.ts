import { string, z } from 'zod';
import { messages } from 'config/messages';
import { validateEmail } from './common-rules';

export const CustomerFormSchema = z.object({
  CustomerName: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(/^[a-zA-Z ]+$/, {
      message: 'Only letters allowed with single space between words',
    }),

  // CustomerFatherName: z
  //   .string()
  //   .min(1, { message: messages.fathernameIsRequired })
  //   .regex(/^[a-zA-Z]+$/, { message: 'letters Only allowed' }),
  CustomerFatherName: z
    .string()
    .min(1, { message: messages.fathernameIsRequired })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: 'Only letters and spaces allowed, and it must start with a letter',
    }),

  CustomerDOB: z.coerce.string().optional(),
  CustomerGender: z.string().min(1, { message: messages.genderIsRequired }),
  CustomerAddress: z.string().min(1, { message: messages.addressIsRequired }),
  CustomerProfession: z.string().optional(),
  CustomerCity: z.string().min(1, { message: messages.cityIdRequired }),
  CustomerAADHAAR: z.string().min(1, { message: messages.aadhaarRequired }),
  CustomerDrivingLicenseNo: z
    .string()
    .regex(/^[A-Z]{2}-\d{13}|^$/, { message: 'Enter Valid Driving License Number' })
    .optional(),
  CustomerDrivingLicenseExpiryDate: z.coerce.string().optional(),
  CustomerPAN: z
    .string()
    .regex(/^[A-Z]{5}-[0-9]{4}[A-Z]|^$/, {
      message: 'PAN card number is not valid',
    })
    .optional(),
  CustomerPhoneNo: z
    .string()
    .min(1, { message: messages.mobileNoRequired })
    .min(10, { message: messages.mobileNoLengthMin }),
  CustomerAlternatePhoneNo: z
    .string()
    .regex(/^[0-9]{10}|^$/, {
      message: messages.mobileNoLengthMin,
    })
    .optional(),
  CustomerEmail: string().optional(),
  CustomerPhotoURL: z.string(),
  CustomerDocumentURL: z.string(),
  CustomerRating: z.coerce.string(),
  CustomerIsBlocked: z.boolean(),
  CustomerIsCurrent: z.boolean(),
  GuarantorName: z.string().optional(),
  GuarantorFatherName: z.string().optional(),
  GuarantorGender: z.string().optional(),
  GuarantorAddress: z.string().optional(),
  GuarantorCity: z.string().optional(),
  GuarantorPhoneNo: z
    .string()
    .regex(/^[0-9]{10}|^$/, {
      message: messages.mobileNoLengthMin,
    })
    .optional(),
  BranchId: z.string().min(1, { message: messages.branchRequired }),
});

export type CustomerFormFieldTypes = z.infer<typeof CustomerFormSchema>;

export interface Customer extends CustomerFormFieldTypes {
  Id?: string;
  CityName?: string;
  LoanNo: number;
}

export const CustomerFormDefaultValues = {
  BranchId: '',
  CustomerName: '',
  CustomerFatherName: '',
  CustomerDOB: '',
  CustomerGender: '',
  CustomerAddress: '',
  CustomerProfession: '',
  CustomerCity: '',
  CustomerAADHAAR: '',
  CustomerDrivingLicenseNo: '',
  CustomerDrivingLicenseExpiryDate: '',
  CustomerPAN: '',
  CustomerPhoneNo: '',
  CustomerAlternatePhoneNo: '',
  CustomerEmail: '',
  CustomerPhotoURL: new File([], 'temp.txt'),
  CustomerDocumentURL: new File([], 'temp.txt'),
  CustomerRating: '5',
  CustomerIsBlocked: false,
  CustomerIsCurrent: true,
  GuarantorName: '',
  GuarantorFatherName: '',
  GuarantorGender: '',
  GuarantorAddress: '',
  GuarantorCity: '',
  GuarantorPhoneNo: '',
  LoanNo: 0,
};
