import { z } from 'zod';
import { messages } from 'config/messages';
import { validateEmail, validatePassword, validateConfirmPassword } from 'utils/types/common-rules';

// form zod validation schema
export const forgetPasswordSchema = z.object({
  email: validateEmail,
});

// generate form types from zod validation schema
export type ForgetPasswordFormFieldTypes = z.infer<typeof forgetPasswordSchema>;

// form zod validation schema
export const resetPasswordSchema = z
  .object({
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword'], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type ResetPasswordFormFieldTypes = z.infer<typeof resetPasswordSchema>;
