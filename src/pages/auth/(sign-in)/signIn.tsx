import { useSignIn } from 'hooks/use-layout';
import { SIGNIN_OPTIONS } from 'config/enums';
import SignIn2 from './sign-in-2/page';
import SignIn5 from './sign-in-5/page';
import SignIn4 from './sign-in-4/page';
import SignIn3 from './sign-in-3/page';
import SignIn1 from './sign-in-1/page';

const DefaultSignIn = () => {
  const { signIn } = useSignIn();

  if (signIn === SIGNIN_OPTIONS.SignIn2) {
    return <SignIn2 />;
  }
  if (signIn === SIGNIN_OPTIONS.SignIn3) {
    return <SignIn3 />;
  }
  if (signIn === SIGNIN_OPTIONS.SignIn4) {
    return <SignIn4 />;
  }
  if (signIn === SIGNIN_OPTIONS.SignIn5) {
    return <SignIn5 />;
  } else {
    return <SignIn1 />;
  }
};

const SignIn = () => {
  return <DefaultSignIn />;
};

export default SignIn;
