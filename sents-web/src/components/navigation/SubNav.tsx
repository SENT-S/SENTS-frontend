'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  bgColor?: boolean;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({
  links,
  selectedLink,
  setSelectedLink,
  bgColor = false,
}: SubNavProps) => {
  const linkClasses = (link: string) =>
    `text-sm md:text-md cursor-pointer px-2 md:px-6 py-2 rounded-full ${
      link === selectedLink
        ? `${bgColor ? 'bg-[#E6EEEA] dark:bg-[#39463E] dark:text-white' : 'bg-green-700 text-white'}`
        : ''
    } text-[39463E] dark:text-white`;

  const containerClasses = `flex flex-wrap justify-around ${
    bgColor ? 'mx-0' : 'mx-10'
  } md:mx-0 items-center p-3 ${
    bgColor ? 'dark:bg-[#0E120F] bg-[#F8FAF9]' : 'dark:bg-[#39463E80] bg-white'
  } rounded-2xl`;

  return (
    <div className={containerClasses}>
      {links.map(link => (
        <div
          key={link}
          className={linkClasses(link)}
          onClick={() => setSelectedLink(link)}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default SubNav;
