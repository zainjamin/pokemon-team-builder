import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderBaseClass = () => {return `
  flex
  flex-row-reverse
  text-light-text-color
  gap-4
  items-center
  p-2
`};
export const Header: FC = () => {
  return (
    <div className={HeaderBaseClass()}>
      <Link to="/log_in">Log In</Link>
      <Link to="/sign_up">Sign Up</Link>
    </div>
  );
};
