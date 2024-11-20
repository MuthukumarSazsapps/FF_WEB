import { Badge } from 'rizzui';
import { ActionIcon } from 'rizzui';
import MessagesDropdown from '../layouts/messages-dropdown';
import NotificationDropdown from '../layouts/notification-dropdown';
import ProfileMenu from '../layouts/profile-menu';
import SettingsButton from '../components/settings/settings-button';
import RingBellSolidIcon from '../components/icons/ring-bell-solid';
import ChatSolidIcon from '../components/icons/chat-solid';
import Button from 'common/button';
import { Link } from 'react-router-dom';
import useLocalData from 'hooks/use-localData';

export default function HeaderMenuRight() {
  const { role } = useLocalData();
  return (
    // <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
    <div className="ms-auto flex shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {role !== 'Admin' ? (
        <Link to="/customer/report">
          <Button
            label="₹ Pay Due"
            color="success"
            type="button"
            variant="solid"
            // onClick={() => ()}
          />
        </Link>
      ) : null}
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9">
          <ChatSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9">
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <ProfileMenu />
    </div>
  );
}
