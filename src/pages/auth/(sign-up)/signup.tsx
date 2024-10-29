import SignUp1 from './sign-up-1/page';
import { useSignUp } from 'hooks/use-layout';
import { SIGNUP_OPTIONS } from 'config/enums';
import SignUp2 from './sign-up-2/page';
import SignUp3 from './sign-up-3/page';
import SignUp4 from './sign-up-4/page';
import SignUp5 from './sign-up-5/page';

const DefaultSignUp = () => {
  const { signUp } = useSignUp();

  if (signUp === SIGNUP_OPTIONS.SignUp2) {
    return <SignUp2 />;
  }
  if (signUp === SIGNUP_OPTIONS.SignUp3) {
    return <SignUp3 />;
  }
  if (signUp === SIGNUP_OPTIONS.SignUp4) {
    return <SignUp4 />;
  }
  if (signUp === SIGNUP_OPTIONS.SignUp5) {
    return <SignUp5 />;
  } else {
    return <SignUp1 />;
  }
};

const SignUp = () => {
  return <DefaultSignUp />;
};

export default SignUp;
