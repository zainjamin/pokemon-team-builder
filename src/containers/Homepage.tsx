import React, { FC } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Logo from '../images/logo.png';
import { SideMenuItem } from '../components/SideMenu';
import { AiFillApple } from 'react-icons/ai';

export const Homepage: FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center gap-3">
        <img src={Logo} className="h-48" />
        <h1 className="text-light-text-color text-3xl text-center font-bold">Welcome to <br /> Pokemon-Team-Builder</h1>
        <button
          className="
        bg-light-accent-color text-light-text-color rounded-full px-4 py-1 font-semibold
        hover:bg-light-accent-color-hover active:bg-light-accent-color-pressed
        hover:text-light-text-color-hover active:text-light-text-color-pressed
        "
        >
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
