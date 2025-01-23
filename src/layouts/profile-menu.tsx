'use client';

import { useNavigate } from 'react-router-dom';
import { Avatar } from 'rizzui';
import { Popover } from 'rizzui';
import { Title, Text } from 'rizzui';
import { routes } from '../config/routes';
import { cn } from '../utils';
import { useEffect, useState } from 'react';
import { useDrawer } from 'hooks/use-drawer';
import DrawerHeader from 'components/settings/drawer-header';
import SettingsDrawer from 'components/settings/settings-drawer';
import CogSolidIcon from 'components/icons/cog-solid';
import { PiUserDuotone } from 'react-icons/pi';
import { actions, dispatch } from 'store';
import useUsers from 'hooks/use-users';
import Button from 'common/button';

const menuItems = [
  {
    name: 'Profile',
    href: routes.forms.personalInformation,
  },
];

function DropdownMenu() {
  const { openDrawer, closeDrawer } = useDrawer();
  const { loginUser } = useUsers();

  const navigate = useNavigate();
  const avatarUrl = loginUser?.Logo ? loginUser.Logo : require('../images/sazslogo.jpg');

  const handleSignout = () => {
    dispatch(actions.logout());
    dispatch(actions.logoutUser());
    localStorage.clear();
    localStorage.removeItem('auth');
    navigate('/login');
  };
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={avatarUrl}
          name={loginUser?.DisplayName ? loginUser.DisplayName : 'Sazs Apps'}
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {loginUser?.DisplayName ? loginUser.DisplayName : 'Sazs Apps'}
          </Title>
          <Text className="text-gray-600">
            {loginUser?.Email ? loginUser.Email : 'www.sazs.com'}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map(item => (
          <a
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50">
            <span style={{ marginRight: 15, marginLeft: 3 }}>
              <PiUserDuotone />
            </span>
            {item.name}
          </a>
        ))}
        <a
          key="Settings"
          onClick={() => {
            openDrawer({
              view: (
                <>
                  <DrawerHeader title="Settings" onClose={closeDrawer} />
                  <SettingsDrawer />
                </>
              ),
              placement: 'right',
              customSize: '420px',
            });
          }}
          className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100
          focus:outline-none hover:dark:bg-gray-50/50">
          <span style={{ marginRight: 10 }}>
            <CogSolidIcon strokeWidth={1.8} className="h-[22px] w-auto animate-spin-slow" />
          </span>
          Settings
        </a>
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          label="Sign Out"
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleSignout}
        />
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = window.location.pathname;
  const { loginUser } = useUsers();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const avatarUrl = loginUser?.Logo ? loginUser.Logo : require('../images/sazslogo.jpg');

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName,
        )}>
        <img
          alt="avatar"
          src={avatarUrl}
          width={50}
          className={cn('!h-13 w-13 sm:!h-10 sm:w-10 rounded-full', 'object-fill', avatarClassName)}
        />
      </button>
    </Popover>
  );
}
