import { RadioGroup } from 'rizzui';
import { useSignIn } from 'hooks/use-layout';
import { SIGNIN_OPTIONS } from 'config/enums';
import HydrogenIcon from 'layouts/hydrogen-icon';
import HeliumIcon from 'layouts/helium-icon';
import LithiumIcon from 'layouts/lithium-icon';
import BerylliumIcon from 'layouts/beryllium-icon';
import RadioBox from 'components/settings/radio-box';
import DrawerBlock from 'components/settings/drawer-block';
import React from 'react';

const signInOptions = [
  {
    icon: HydrogenIcon,
    value: SIGNIN_OPTIONS.SignIn1,
  },
  {
    icon: HeliumIcon,
    value: SIGNIN_OPTIONS.SignIn2,
  },
  {
    icon: LithiumIcon,
    value: SIGNIN_OPTIONS.SignIn3,
  },
  {
    icon: BerylliumIcon,
    value: SIGNIN_OPTIONS.SignIn4,
  },
  {
    icon: BerylliumIcon,
    value: SIGNIN_OPTIONS.SignIn5,
  },
];

export default function SignInSwitcher() {
  const { signIn, setsignIn } = useSignIn();

  return (
    <DrawerBlock title="SignIn Layouts">
      <RadioGroup
        value={signIn}
        setValue={(selectedSignUp: any) => setsignIn(selectedSignUp)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-5"
        color="primary">
        {signInOptions.map(item => (
          <RadioBox
            key={item.value}
            value={item.value}
            className="flex h-auto flex-col justify-center gap-3 rounded-lg p-0">
            <span className="radio-active inline-flex rounded-lg capitalize">
              <item.icon aria-label={item.value} className="h-[92px] w-full" />
            </span>
            <span>{item.value}</span>
          </RadioBox>
        ))}
      </RadioGroup>
    </DrawerBlock>
  );
}
