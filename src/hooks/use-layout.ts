import { atom, useAtom } from 'jotai';
import {
  FORGOT_OPTIONS,
  LAYOUT_OPTIONS,
  OTP_OPTIONS,
  SIGNIN_OPTIONS,
  SIGNUP_OPTIONS,
} from 'config/enums';

// 1. set initial atom for isomorphic layout
const isomorphicLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-layout')
    : LAYOUT_OPTIONS.HYDROGEN,
);
const isomorphicLayoutAtomWithPersistence = atom(
  get => get(isomorphicLayoutAtom),
  (get, set, newStorage: any) => {
    set(isomorphicLayoutAtom, newStorage);
    localStorage.setItem('isomorphic-layout', newStorage);
  },
);
// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(isomorphicLayoutAtomWithPersistence);
  return {
    layout: layout === null ? LAYOUT_OPTIONS.HYDROGEN : layout,
    setLayout,
  };
}

//signup layout hook
const isomorphicSignUpAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-signUp')
    : SIGNUP_OPTIONS.SignUp1,
);
const isomorphicSignUpAtomWithPersistence = atom(
  get => get(isomorphicSignUpAtom),
  (get, set, newStorage2: any) => {
    set(isomorphicSignUpAtom, newStorage2);
    localStorage.setItem('isomorphic-signUp', newStorage2);
  },
);
export function useSignUp() {
  const [signUp, setsignUp] = useAtom(isomorphicSignUpAtomWithPersistence);
  return {
    signUp: signUp === null ? SIGNUP_OPTIONS.SignUp1 : signUp,
    setsignUp,
  };
}

//signin layout hook
const isomorphicSignInAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-signIn')
    : SIGNIN_OPTIONS.SignIn1,
);
const isomorphicSignInAtomWithPersistence = atom(
  get => get(isomorphicSignInAtom),
  (get, set, newStorage3: any) => {
    set(isomorphicSignInAtom, newStorage3);
    localStorage.setItem('isomorphic-SignIn', newStorage3);
  },
);
export function useSignIn() {
  const [signIn, setsignIn] = useAtom(isomorphicSignInAtomWithPersistence);
  return {
    signIn: signIn === null ? SIGNIN_OPTIONS.SignIn1 : signIn,
    setsignIn,
  };
}

//otp layout hook

const isomorphicOtpAtom = atom(
  typeof window !== 'undefined' ? localStorage.getItem('isomorphic-Otp') : OTP_OPTIONS.Otp1,
);
const isomorphicOtpAtomWithPersistence = atom(
  get => get(isomorphicOtpAtom),
  (get, set, newStorage4: any) => {
    set(isomorphicOtpAtom, newStorage4);
    localStorage.setItem('isomorphic-Otp', newStorage4);
  },
);
export function useOtp() {
  const [otp, setOtp] = useAtom(isomorphicOtpAtomWithPersistence);
  return {
    otp: otp === null ? OTP_OPTIONS.Otp1 : otp,
    setOtp,
  };
}
//forgot password layout

const isomorphicForgotAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-Forgot')
    : FORGOT_OPTIONS.Forgot1,
);
const isomorphicForgotAtomWithPersistence = atom(
  get => get(isomorphicForgotAtom),
  (get, set, newStorage5: any) => {
    set(isomorphicForgotAtom, newStorage5);
    localStorage.setItem('isomorphic-Forgot', newStorage5);
  },
);
export function useForgot() {
  const [forgot, setForgot] = useAtom(isomorphicForgotAtomWithPersistence);
  return {
    forgot: forgot === null ? FORGOT_OPTIONS.Forgot1 : forgot,
    setForgot,
  };
}
