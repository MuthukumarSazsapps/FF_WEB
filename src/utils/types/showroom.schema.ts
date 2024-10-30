import { z } from 'zod';
import { messages } from 'config/messages';

export const ShowRoomFormSchema = z.object({
  ShowRoomName: z.string().min(1, { message: messages.nameIsRequired }),
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  ShowRoomPhoneNumber: z
    .string()
    .min(1, { message: messages.mobileNoRequired })
    .min(10, { message: messages.mobileNoLengthMin }),
  CityId: z.string().min(1, { message: messages.cityIdRequired }),
  AccountHolderName: z.string().min(1, { message: messages.accountholderName }),
  AccountNumber: z.string().min(1, { message: messages.accountnumberrequired }),
  BranchName: z.string().min(1, { message: messages.branchNamerequired }),
  IFSCcode: z.string().min(1, { message: messages.ifsccoderequired }),
  IsActive: z.string(),
});

export type ShowRoomFormFieldTypes = z.infer<typeof ShowRoomFormSchema>;

export interface ShowRoom extends ShowRoomFormFieldTypes {
  Id?: string;
}

export const ShowRoomFormDefaultValues = {
  ShowRoomName: '',
  ShowRoomPhoneNumber: '',
  BranchId: '',
  CityId: '',
  AccountHolderName: '',
  AccountNumber: '',
  IFSCcode: '',
  BranchName: '',
  IsActive: '1',
};
