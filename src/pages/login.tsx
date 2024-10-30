import { Link } from 'react-router-dom';
import { cn } from 'utils';
import OrSeparation from 'common/auth-layout/or-separation';
import LoginForm from './login-form';

const Login = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-4 md:p-12 lg:p-28">
      <div
        className={cn(
          'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 dark:bg-gray-50 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl',
        )}>
        <div className="flex flex-col items-center">
          <Link to={'/'} className="mb-7 inline-block max-w-[94px] lg:mb-9">
            <img src={require('../images/sazsgrey.png')} alt="Sazs Apps" className="dark:invert" />
          </Link>
        </div>

        <OrSeparation title={`Sign in with UserName and Password`} isCenter className="mb-4" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
