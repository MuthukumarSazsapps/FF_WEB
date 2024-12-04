import { AiFillHome } from 'react-icons/ai';
import { routes } from '../../config/routes';
import {
  PiTableDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiFolderNotchDuotone,
} from 'react-icons/pi';

export type StaticSubMenuItem = {
  name: string;
  href?: string;
  icon?: JSX.Element | string;
  badge?: string;
};

export interface StaticMenuItem extends StaticSubMenuItem {
  dropdownItems?: StaticSubMenuItem[];
}
export const StaticMenuItems: StaticMenuItem[] = [
  {
    name: 'Pages',
  },
  {
    name: 'Home',
    href: '/',
    icon: <AiFillHome />,
  },
];

export const SubscriberItems: StaticMenuItem[] = [
  {
    name: 'Customer Management',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'Create Customer',
        href: '/customer/create',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Customers List',
        href: '/list/customers',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Customer Statement',
        href: '/customer/report',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Outstanding Customer',
        href: '/customer/outstanding',
        icon: <PiFolderNotchDuotone />,
      },
    ],
  },
  {
    name: 'Loan Master',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'Create Loan',
        href: '/loan/create',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Loan List',
        href: '/list/loans',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Loan Preclose',
        href: '/loan/preclose',
        icon: <PiFolderNotchDuotone />,
      },
    ],
  },
  {
    name: 'Finance Master',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'City List',
        href: '/list/sub-cities',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Agents List',
        href: '/list/agents',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'Branch List',
        href: '/list/branches',
        icon: <PiFolderNotchDuotone />,
      },
      {
        name: 'ShowRoom List',
        href: '/list/showrooms',
        icon: <PiFolderNotchDuotone />,
      },

      {
        name: 'Vehicle List',
        href: '/list/vehicles',
        icon: <PiFolderNotchDuotone />,
      },
    ],
  },
  // {
  //   name: 'Ledger',
  //   href: '/list/ledger',
  //   icon: <PiFolderNotchDuotone />,
  // },
  {
    name: 'ledger',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'Ledger Creation',
        href: '/list/ledger',
        badge: 'new',
      },
      {
        name: 'Ledger Transaction',
        href: '/Ledger/transaction',
        badge: 'new',
      },
    ],
  },
  {
    name: 'Report',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'Pending Report',
        href: '/report/pending',
        badge: 'new',
      },
      {
        name: 'Documnets Report',
        href: '/report/documents',
        badge: 'new',
      },
      {
        name: 'DayBook',
        href: '/report/daybook',
        badge: 'new',
      },
      {
        name: 'Default Report',
        href: '/report/Default',
        badge: 'new',
      },
      {
        name: 'Pending Capital Report',
        href: '/report/PendingCapital',
        badge: 'new',
      },
    ],
  },
  {
    name: 'User Management',
    href: '#',
    icon: <PiTableDuotone />,
    dropdownItems: [
      {
        name: 'Users List',
        href: '/list/users',
        badge: 'new',
      },
    ],
  },
  {
    name: 'Logs',
    href: '/list/sub-logs',
    icon: <PiTableDuotone />,
  },
  {
    name: 'Payments',
    href: '/payments',
    icon: <PiTableDuotone />,
  },
];

export const AdminItems: StaticMenuItem[] = [
  {
    name: 'Subscriber Management',
  },
  {
    name: 'Subscribers List',
    href: routes.tables.enhanced,
    icon: <PiTableDuotone />,
  },
  {
    name: 'Menu List',
    href: routes.tables.menu,
    icon: <PiTableDuotone />,
  },
  {
    name: 'SubMenu List',
    href: routes.tables.subMenu,
    icon: <PiTableDuotone />,
  },
  {
    name: 'State List',
    href: '/list/states',
    icon: <PiTableDuotone />,
  },
  {
    name: 'City List',
    href: '/list/cities',
    icon: <PiTableDuotone />,
  },
  {
    name: 'Logs',
    href: '/list/logs',
    icon: <PiTableDuotone />,
  },
];
