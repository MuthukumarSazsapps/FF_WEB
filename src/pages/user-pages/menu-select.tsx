import useMenus from 'hooks/use-menu';
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Checkbox, Collapse, Title } from 'rizzui';
import { PiCaretDownBold } from 'react-icons/pi';
import { Menu } from 'utils/types';
import { cn } from 'utils';

interface MenuSelectorProps {
  menus: Menu[];
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
  isEdit: boolean;
}

type onMoveMenu = (draggedIndex: number, hoveredIndex: number, parentIndex: number | null) => void;

interface DraggableProps {
  moveMenu: onMoveMenu;
  children: React.ReactNode;
  index: number;
  parentIndex?: number | null;
}

type CheckBoxChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  isSubMenu?: boolean,
  parentId?: string,
) => void;

const Draggable: React.FC<DraggableProps> = ({ index, parentIndex = null, moveMenu, children }) => {
  const isSubMenu = parentIndex === null;
  const [, ref] = useDrag({
    type: isSubMenu ? 'Card' : 'SubMenu-Card' + parentIndex,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: isSubMenu ? 'Card' : 'SubMenu-Card' + parentIndex,
    drop: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveMenu(draggedItem.index, index, parentIndex);
      }
    },
  });

  return (
    <div
      className="items-center"
      ref={(node: HTMLDivElement) => ref(drop(node))}
      style={{ cursor: 'move' }}>
      {children}
    </div>
  );
};

const CustomMenuText: React.FC<{
  id: string;
  menuName: string;
  isRotated?: boolean;
  showCaret?: boolean;
  showCheckBox?: boolean;
  onCheckBoxChange?: React.ChangeEventHandler<HTMLInputElement>;
  onWrapperClick?: React.MouseEventHandler<HTMLDivElement>;
  checked?: boolean;
}> = ({
  onCheckBoxChange,
  id,
  onWrapperClick = () => {},
  menuName,
  // By default the features like CaretIcon and Checkbox was disabled as this is typography component,
  // If you want to show the CaretIcon or Checkbox explicitly declare the show props true.
  isRotated = false,
  showCaret = false,
  showCheckBox = false,
  checked,
}) => {
  return (
    <div
      onClick={onWrapperClick}
      className={cn(
        'group relative mx-3 flex cursor-pointer items-center justify-between rounded-full px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
        'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700',
      )}>
      <div className="flex items-center truncate">
        {showCheckBox ? (
          <span
            className={cn(
              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-full [&>svg]:h-[20px] [&>svg]:w-[20px]',
              'text-primary',
            )}>
            <Checkbox
              variant="flat"
              key={id}
              value={id}
              onChange={onCheckBoxChange}
              checked={checked}
            />
          </span>
        ) : (
          <></>
        )}
        <span className="truncate">{menuName}</span>
      </div>
      {showCaret ? (
        <PiCaretDownBold
          strokeWidth={3}
          className={cn(
            'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
            isRotated && 'rotate-0 rtl:rotate-0',
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const MenuList: React.FC<MenuSelectorProps> = ({ menus, setMenus }) => {
  const moveMenu: onMoveMenu = (dragIndex, hoverIndex, parentIndex) => {
    const allMenus = structuredClone(menus);
    if (parentIndex !== null) {
      const parentMenu = allMenus[parentIndex];
      if (parentMenu) {
        const draggedMenu = parentMenu.subMenus ? parentMenu.subMenus[dragIndex] : false;
        if (dragIndex !== -1 && hoverIndex !== -1 && draggedMenu) {
          parentMenu.subMenus?.splice(dragIndex, 1);
          parentMenu.subMenus?.splice(hoverIndex, 0, draggedMenu);
        }
        allMenus[parentIndex] = parentMenu;
      }
    } else {
      const draggedMenu = allMenus[dragIndex];
      if (dragIndex !== -1 && hoverIndex !== -1 && draggedMenu) {
        allMenus.splice(dragIndex, 1);
        allMenus.splice(hoverIndex, 0, draggedMenu);
      }
    }
    setMenus(allMenus);
  };

  return menus.map((menu, index) => {
    if (menu.subMenus?.length) {
      return (
        <Draggable key={menu.MenuId} index={index} moveMenu={moveMenu}>
          <Collapse
            key={menu.MenuId}
            header={({ open, toggle }) => (
              <CustomMenuText
                id={menu.MenuId}
                onWrapperClick={toggle}
                menuName={menu.MenuName}
                isRotated={open}
                showCaret={true}
              />
            )}>
            {menu.subMenus.map((subMenu, subMenuIndex) => {
              return (
                <Draggable
                  key={subMenu.SubMenuId}
                  index={subMenuIndex}
                  parentIndex={index}
                  moveMenu={moveMenu}>
                  <div className="ps-8">
                    <CustomMenuText id={subMenu.SubMenuId} menuName={subMenu.SubMenuName} />
                  </div>
                </Draggable>
              );
            })}
          </Collapse>
        </Draggable>
      );
    }
    return (
      <Draggable key={menu.MenuId} index={index} moveMenu={moveMenu}>
        <CustomMenuText id={menu.MenuId} menuName={menu.MenuName} />
      </Draggable>
    );
  });
};

const AllMenus: React.FC<MenuSelectorProps> = ({ menus, setMenus, isEdit }) => {
  const { allMenus } = useMenus({ list: true });
  const fillteredMenus = allMenus.filter(val => val.subMenus?.length != 0);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

  // Below logics only focused on the parent
  // If the parent selected means, all the children will be visible until we change the children.
  // If none of the children are selected and the parent selected means,
  // all the children will be there in the selected menus section.
  const onCheckBoxChange: CheckBoxChangeHandler = (e, isSubMenu, parentId) => {
    const consideringIds = [e.target.value];
    if (selectedMenus.includes(e.target.value)) {
      if (!isSubMenu) {
        // Parent unchecked, So removing all children
        const currentMenu = fillteredMenus.find(menu => menu.MenuId === e.target.value);
        currentMenu?.subMenus?.forEach(subMenu => consideringIds.push(subMenu.SubMenuId));
      }
      setSelectedMenus(selectedMenus.filter(menu => !consideringIds.includes(menu)));
    } else {
      if (!isSubMenu) {
        // Parent chekced, So adding all children
        const currentMenu = fillteredMenus.find(menu => menu.MenuId === e.target.value);
        currentMenu?.subMenus?.forEach(subMenu => {
          if (!selectedMenus.includes(subMenu.SubMenuId)) {
            consideringIds.push(subMenu.SubMenuId);
          }
        });
      }
      if (isSubMenu) {
        // Children Checked but no parent is present so adding parent
        const currentMenu = fillteredMenus.find(menu => menu.MenuId === parentId) ?? '';
        if (currentMenu && !selectedMenus.includes(currentMenu.MenuId)) {
          consideringIds.push(currentMenu.MenuId);
        }
      }
      setSelectedMenus([...selectedMenus, ...consideringIds]);
    }
  };

  useEffect(() => {
    if (selectedMenus.length) {
      const temp: Menu[] = [];
      fillteredMenus.forEach(menu => {
        const selectedSubMenus =
          menu.subMenus?.filter(subMenu => selectedMenus.includes(subMenu.SubMenuId)) ?? [];
        if (selectedSubMenus.length) {
          temp.push(Object.assign({}, menu, { subMenus: selectedSubMenus }));
        } else if (selectedMenus.includes(menu.MenuId)) {
          temp.push(menu);
        }
      });
      setMenus(temp);
    } else {
      setMenus([]);
    }
  }, [selectedMenus]);

  useEffect(() => {
    if (isEdit && !selectedMenus.length && menus.length) {
      const allMenuIds = menus
        .map(menu => [
          menu.MenuId,
          ...(menu.subMenus ? menu.subMenus.map(subMenu => subMenu.SubMenuId) : []),
        ])
        .flat();
      setSelectedMenus(allMenuIds);
    }
  }, [isEdit, selectedMenus, menus]);

  return fillteredMenus.map(menu => {
    if (menu.subMenus?.length) {
      return (
        <Collapse
          key={menu.MenuId}
          header={({ open, toggle }) => (
            <CustomMenuText
              checked={
                selectedMenus.includes(menu.MenuId) ||
                menu.subMenus?.some(subMenu => selectedMenus.includes(subMenu.SubMenuId))
              }
              onWrapperClick={toggle}
              onCheckBoxChange={onCheckBoxChange}
              id={menu.MenuId}
              key={menu.MenuId}
              showCaret={true}
              showCheckBox={true}
              isRotated={open}
              menuName={menu.MenuName}
            />
          )}>
          {menu.subMenus.map(subMenu => {
            return (
              <div className="ps-8" key={subMenu.SubMenuId}>
                <CustomMenuText
                  checked={selectedMenus.includes(subMenu.SubMenuId)}
                  onCheckBoxChange={e => onCheckBoxChange(e, true, menu.MenuId)}
                  id={subMenu.SubMenuId}
                  key={subMenu.SubMenuId}
                  menuName={subMenu.SubMenuName}
                  showCheckBox={true}
                />
              </div>
            );
          })}
        </Collapse>
      );
    }
    return (
      <CustomMenuText
        checked={selectedMenus.includes(menu.MenuId)}
        onCheckBoxChange={onCheckBoxChange}
        id={menu.MenuId}
        key={menu.MenuId}
        menuName={menu.MenuName}
        showCheckBox={true}
      />
    );
  });
};

const MenuSelect: React.FC<MenuSelectorProps> = ({ menus, setMenus, isEdit }) => {
  return (
    <div className="flex flex-col justify-center">
      <Title className="self-center font-medium text-2xl font-sans p-6">Select the Menus</Title>
      <div className="flex flex-row justify-center">
        <div className="basis-1/2 w-full text-center">
          <p className="font-bold my-2 text-center">All Menus</p>
          <AllMenus menus={menus} setMenus={setMenus} isEdit={isEdit} />
        </div>
        <div className="basis-1/2 w-full text-center">
          <p className="font-bold my-2 text-center">Selected Menus</p>
          <MenuList menus={menus} setMenus={setMenus} isEdit={isEdit} />
        </div>
      </div>
    </div>
  );
};

export default MenuSelect;
