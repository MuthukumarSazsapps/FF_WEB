import SimpleBar from 'common/simplebar';
import LayoutSwitcher from 'components/settings/layout-switcher';
import ColorOptions from 'components/settings/color-options';
import AppDirection from 'components/settings/app-direction';
import ThemeSwitcher from 'components/settings/theme-switcher';
import SignUpSwitcher from 'components/settings/SignUpSwitcher';
import SignInSwitcher from 'components/settings/SignInSwitcher';
import OtpSwitcher from 'components/settings/OtpSwitcher';
import ForPassSwitcher from 'components/settings/ForPassSwitcher';

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          <AppDirection />
          <LayoutSwitcher />
          <ColorOptions />
          <SignUpSwitcher />
          <SignInSwitcher />
          <OtpSwitcher />
          <ForPassSwitcher />
        </div>
      </SimpleBar>
    </>
  );
}
