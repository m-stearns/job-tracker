// import { Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
import React from 'react';
import { Navbar } from './Navbar';

export const Layout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
