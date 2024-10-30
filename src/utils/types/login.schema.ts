import { messages } from 'config/messages';
import { z } from 'zod';
import { validateEmail } from './common-rules';

// form zod validation schema
export const LoginSchema = z.object({
  username: z.string().min(1, { message: messages.userNameRequired }),
  password: z.string().min(1, { message: messages.passwordRequired }),
  rememberMe: z.boolean().optional(),
});

// generate form types from zod validation schema
export type LoginFormFieldTypes = z.infer<typeof LoginSchema>;

export const loginFormDefaultValues = {
  username: '',
  password: '',
  rememberMe: false,
};
