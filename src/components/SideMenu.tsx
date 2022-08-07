import { BriefcaseIcon, HomeIcon, MenuAlt2Icon, MenuAlt3Icon, UserIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const SideMenuItemBaseClasses = (active?: boolean) => {
  return `
  ${active && 'bg-accent-color'}
  ${
    !active &&
    `
  hover:bg-light-background-hover
  focus:bg-light-background-hover
  active:bg-light-background-pressed
  text-light-text-color
  hover:text-light-text-color-hover
  active:text-light-color-pressed
  `
  }
  rounded-full
  p-3
  flex
  items-center
  gap-2
  whitespace-nowrap
  `;
};
export interface SideMenuItemProps {
  link: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}
export const SideMenuItem: FC<SideMenuItemProps> = (
  props: SideMenuItemProps,
) => {
  const { link, label, icon, active } = props;
  return (
    <Link to={link} className={SideMenuItemBaseClasses(active)}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};
export const SideMenu: FC = () => {
  const items = [
    { link: '/', label: 'Home', icon: <HomeIcon className="w-6" /> },
    { link: '/my_account', label: 'My Account', icon: <UserIcon className="w-6" /> },
    { link: '/builder', label: 'Team Builder', icon: <BriefcaseIcon className="w-6" /> },
  ];
  const [active, setActive] = useState(false);
  return active ? (
    <div className="bg-light-accent-background">
      <div className="flex gap-4 items-end p-2">
        <span className="text-light-accent-color font-bold text-lg">
          PokeBuilder
        </span>
        <button onClick={() => setActive(!active)}>
          <MenuAlt2Icon className="h-8 w-8 text-light-accent-color" />
        </button>
      </div>
      {active && items.map((itemProps) => <SideMenuItem {...itemProps} />)}
    </div>
  ) : (
    <div className="bg-light-accent-background flex flex-col gap-6 items-center p-2 text-light-text-color">
      <button onClick={() => setActive(!active)}>
        <MenuAlt3Icon className="h-8 w-8 text-light-accent-color" />
      </button>
      {items.map((itemProps) => <Link to={itemProps.link}>{itemProps.icon}</Link>)}
    </div>
  );
};
