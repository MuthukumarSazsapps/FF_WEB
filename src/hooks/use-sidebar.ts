import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Menu } from 'utils/types';
import useLocalData from './use-localData';
import {
  AdminItems,
  StaticMenuItem,
  StaticMenuItems,
  StaticSubMenuItem,
  SubscriberItems,
} from 'layouts/hydrogen/menu-items';
import { useLocalStorage } from 'react-use';

type useSidebarReturn = {
  userMenus: StaticMenuItem[];
};

const useSidebar = (): useSidebarReturn => {
  const [userMenus, setUserMenus] = useState<StaticMenuItem[]>([]);
  const menus = useSelector<RootState, Menu[]>(state => state.menus.list);
  const { role, userId } = useLocalData();
  const [routes, setRoutes, removeRoutes] = useLocalStorage('Routes');

  useEffect(() => {
    if (role === 'User' && userId) {
      dispatch(actions.listMenusRequest({ userId }));
    }
  }, [userId, role]);

  useEffect(() => {
    switch (role) {
      case 'Admin':
        setUserMenus([...StaticMenuItems, ...AdminItems]);
        break;
      case 'Subscriber':
        setUserMenus([...StaticMenuItems, ...SubscriberItems]);
        break;
      case 'User': {
        const updatedMenus = menus.map(menu => {
          let dropdownItems: StaticSubMenuItem[] = [];
          if (menu.subMenus?.length) {
            dropdownItems = menu.subMenus.map(
              subMenu => ({ name: subMenu.SubMenuName, href: subMenu.Path }) as StaticSubMenuItem,
            );
          }
          return {
            name: menu.MenuName,
            href: '#',
            dropdownItems,
          };
        });
        if (updatedMenus.length) {
          setUserMenus([...StaticMenuItems, ...updatedMenus]);
          const submenus = updatedMenus.flatMap((val: any) => val.dropdownItems);
          const paths = submenus.flatMap((val: any) => val?.href);
          setRoutes(JSON.stringify(paths));
        }
        break;
      }
      default:
        break;
    }
  }, [menus, AdminItems, SubscriberItems]);

  return { userMenus };
};

export default useSidebar;
