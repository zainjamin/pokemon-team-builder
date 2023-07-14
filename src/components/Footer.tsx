import React, { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';

const FooterBaseClasses = `
flex
items-center
justify-center
gap-4
text-light-text-color
pb-2
`;
export const Footer: FC = () => {
  return (
    <div className={FooterBaseClasses}>
      <span>&copy; 2022 Zain Salman</span>
      <a target="_blank" href="https://github.com/zainjamin">
        <AiFillGithub />
      </a>
      <a target="_blank" href="https://teambuilder.zains.dev">
        <CgWebsite />
      </a>
    </div>
  );
};
