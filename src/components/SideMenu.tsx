import React, { FC, useState } from 'react';
import { IconType } from 'react-icons';
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
  p-3
  flex
  items-center
  gap-2
  `;
};
export interface SideMenuItemProps {
  link: string;
  label: string;
  icon?: React.ReactNode;
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
export interface SideMenuProps {
  items: Array<SideMenuItemProps>;
}
export const SideMenu: FC<SideMenuProps> = (props: SideMenuProps) => {
  return <div></div>;
};
