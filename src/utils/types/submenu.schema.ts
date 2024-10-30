import { z } from 'zod';
import { messages } from 'config/messages';

export const SubMenuFormSchema = z.object({
  SubMenuName: z.string().min(1, { message: messages.menunameIsRequired }),
  MenuId: z.string().min(1, { message: messages.menunameIsRequired }),
  Path: z.string().min(4, { message: messages.pathIsRequired }),
  Icon: z.string(),
  SubMenuOrder: z.coerce.number().min(1, { message: 'Order No required' }),
  IsActive: z.string(),
});
export type SubMenuFormFieldTypes = z.infer<typeof SubMenuFormSchema>;

export const subMenuFormDefaultValues = {
  Id: '',
  SubMenuId: '',
  SubMenuName: '',
  MenuId: '',
  Path: '',
  Icon: '',
  SubMenuOrder: '',
  IsActive: '1',
};

export interface SubMenu extends SubMenuFormFieldTypes {
  SubMenuId: string;
}
