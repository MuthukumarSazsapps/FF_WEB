import { z } from 'zod';
import { messages } from 'config/messages';

export const SupplierFormSchema = z.object({
  SupplierName: z.string().min(1, { message: 'suppliernameIsRequired' }),
  SupplierId: z.string().min(1, { message: 'suppliernameIsRequired' }),
  Path: z.string().min(4, { message: 'supplierpathIsRequired' }),
  Icon: z.string(),
  SupplierOrder: z.coerce.number().min(1, { message: 'Order No required' }),
  IsActive: z.string(),
});
export type SupplierFormFieldTypes = z.infer<typeof SupplierFormSchema>;

export const SupplierFormDefaultValues = {
  Id: '',
  SupplierId: '',
  SupplierName: '',
  Path: '',
  Icon: '',
  SupplierOrder: '',
  IsActive: '1',
};

export interface Supplier extends SupplierFormFieldTypes {
  SupplierId: string;
}
