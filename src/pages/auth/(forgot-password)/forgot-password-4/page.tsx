import AuthWrapperFour from 'common/auth-layout/auth-wrapper-four';
import ForgetPasswordForm from './forgot-password-form';

export default function ForgotPassword4() {
  return (
    <AuthWrapperFour
      title={
        <>
          Having trouble to sign in? <br className="hidden sm:inline-block" /> Reset your password.
        </>
      }>
      <ForgetPasswordForm />
    </AuthWrapperFour>
  );
}
