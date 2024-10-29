import { RadioGroup } from 'rizzui';
import { useSignUp } from 'hooks/use-layout';
import { SIGNUP_OPTIONS } from 'config/enums';
import HydrogenIcon from 'layouts/hydrogen-icon';
import HeliumIcon from 'layouts/helium-icon';
import LithiumIcon from 'layouts/lithium-icon';
import BerylliumIcon from 'layouts/beryllium-icon';
import RadioBox from 'components/settings/radio-box';
import DrawerBlock from 'components/settings/drawer-block';
import React from 'react';

const signUpOptions = [
  {
    icon: HydrogenIcon,
    value: SIGNUP_OPTIONS.SignUp1,
  },
  {
    icon: HeliumIcon,
    value: SIGNUP_OPTIONS.SignUp2,
  },
  {
    icon: LithiumIcon,
    value: SIGNUP_OPTIONS.SignUp3,
  },
  {
    icon: BerylliumIcon,
    value: SIGNUP_OPTIONS.SignUp4,
  },
  {
    icon: BerylliumIcon,
    value: SIGNUP_OPTIONS.SignUp5,
  },
];

export default function SignUpSwitcher() {
  const { signUp, setsignUp } = useSignUp();

  return (
    <DrawerBlock title="SignUp Layouts">
      <RadioGroup
        value={signUp}
        setValue={(selectedSignUp: any) => setsignUp(selectedSignUp)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-5"
        color="primary">
        {signUpOptions.map(item => (
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
