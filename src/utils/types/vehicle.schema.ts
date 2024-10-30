import { z } from 'zod';
import { messages } from 'config/messages';

export const VehicleFormSchema = z.object({
  VehicleName: z.string().min(1, { message: messages.vehicleNameRequired }),
  Brand: z.string().min(1, { message: messages.branchRequired }),
  WheelBase: z.string(),
  VehicleType: z.string().min(1, { message: messages.vehicleTypeRequired }),
  Variant: z.string().min(1, { message: messages.vehicleVariantRequired }),
  BranchId: z.string().min(1, { message: messages.branchRequired }),
  IsActive: z.string(),
});

export type VehicleFormFieldTypes = z.infer<typeof VehicleFormSchema>;

export interface Vehicle extends VehicleFormFieldTypes {
  Id?: string;
}

export const VehicleFormDefaultValues = {
  BranchId: '',
  VehicleName: '',
  Brand: '',
  VehicleType: '',
  WheelBase: '2',
  Variant: '',
  IsActive: '1',
};
