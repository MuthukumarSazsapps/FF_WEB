import { RadioGroup } from 'rizzui';
import { useOtp } from 'hooks/use-layout';
import { OTP_OPTIONS } from 'config/enums';
import HydrogenIcon from 'layouts/hydrogen-icon';
import HeliumIcon from 'layouts/helium-icon';
import LithiumIcon from 'layouts/lithium-icon';
import BerylliumIcon from 'layouts/beryllium-icon';
import RadioBox from 'components/settings/radio-box';
import DrawerBlock from 'components/settings/drawer-block';

const otpOptions = [
  {
    icon: HydrogenIcon,
    value: OTP_OPTIONS.Otp1,
  },
  {
    icon: HeliumIcon,
    value: OTP_OPTIONS.Otp2,
  },
  {
    icon: LithiumIcon,
    value: OTP_OPTIONS.Otp3,
  },
  {
    icon: BerylliumIcon,
    value: OTP_OPTIONS.Otp4,
  },
  {
    icon: BerylliumIcon,
    value: OTP_OPTIONS.Otp5,
  },
];

export default function OtpSwitcher() {
  const { otp, setOtp } = useOtp();

  return (
    <DrawerBlock title="Otp Layouts">
      <RadioGroup
        value={otp}
        setValue={(selectedOtp: any) => setOtp(selectedOtp)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-5"
        color="primary">
        {otpOptions.map(item => (
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
