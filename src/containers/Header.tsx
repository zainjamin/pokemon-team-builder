import React, { FC } from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from '@heroicons/react/solid'

const HeaderBaseClass = `
  flex
  text-light-text-color
  justify-between
`

export const Header: FC = () => {
  return (
    <div className={HeaderBaseClass}>
      <MenuIcon className="h-6 w-6 text-light-accent-color" />
      <div className="links">
        <Link to="/log_in">Log In</Link>
        <Link to="/sign_up">Sign Up</Link>
      </div>
    </div>
  )
};