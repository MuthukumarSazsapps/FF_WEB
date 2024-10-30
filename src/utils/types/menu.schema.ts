import { z } from 'zod';
import { messages } from 'config/messages';
import { SubMenu } from './submenu.schema';

export const MenuFormSchema = z.object({
  MenuName: z.string().min(1, { message: messages.menunameIsRequired }),
  MenuOrder: z.coerce.number().min(1, { message: 'Menu Order Required' }),
  Icon: z.string(),
  IsActive: z.string(),
});

export type MenuFormFieldTypes = z.infer<typeof MenuFormSchema>;

export const menuFormDefaultValues = {
  MenuId: '',
  MenuName: '',
  MenuOrder: '',
  Icon: '',
  IsActive: '1',
};

export interface Menu extends MenuFormFieldTypes {
  Id?: string;
  MenuId: string;
  subMenus?: SubMenu[];
}
