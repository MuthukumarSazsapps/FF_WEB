import { RadioGroup } from 'rizzui';
import { useForgot } from 'hooks/use-layout';
import { FORGOT_OPTIONS } from 'config/enums';
import HydrogenIcon from 'layouts/hydrogen-icon';
import HeliumIcon from 'layouts/helium-icon';
import LithiumIcon from 'layouts/lithium-icon';
import BerylliumIcon from 'layouts/beryllium-icon';
import RadioBox from 'components/settings/radio-box';
import DrawerBlock from 'components/settings/drawer-block';

const forgotOptions = [
  {
    icon: HydrogenIcon,
    value: FORGOT_OPTIONS.Forgot1,
  },
  {
    icon: HeliumIcon,
    value: FORGOT_OPTIONS.Forgot2,
  },
  {
    icon: LithiumIcon,
    value: FORGOT_OPTIONS.Forgot3,
  },
  {
    icon: BerylliumIcon,
    value: FORGOT_OPTIONS.Forgot4,
  },
  {
    icon: BerylliumIcon,
    value: FORGOT_OPTIONS.Forgot5,
  },
];

export default function ForPassSwitcher() {
  const { forgot, setForgot } = useForgot();

  return (
    <DrawerBlock title="Forgot Password Layouts">
      <RadioGroup
        value={forgot}
        setValue={(selectedForgot: any) => setForgot(selectedForgot)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-5"
        color="primary">
        {forgotOptions.map(item => (
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
