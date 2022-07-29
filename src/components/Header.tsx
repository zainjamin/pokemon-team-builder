import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';
import { SideMenuItem } from './SideMenu';
import { AiFillApple } from 'react-icons/ai';

const HeaderBaseClass = () => {return `
  flex
  text-light-text-color
  justify-between
  px-2
  py-2
`};

export const Header: FC = () => {
  return (
    <div className={HeaderBaseClass()}>
      <button>
        <MenuIcon className="h-8 w-8 text-light-accent-color" />
      </button>
      <div className="flex gap-4 items-center justify-center">
        <Link to="/log_in">Log In</Link>
        <Link to="/sign_up">Sign Up</Link>
      </div>
    </div>
  );
};
