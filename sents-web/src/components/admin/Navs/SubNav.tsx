'use client';
import React from 'react';
import { GoPlusCircle } from 'react-icons/go';
import Add_new_category from '@/components/admin/Add_new_category';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  bgColor?: boolean;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({ links, selectedLink, setSelectedLink }: SubNavProps) => {
  const linkClasses = (link: string) =>
    `text-sm md:text-md cursor-pointer px-2 md:px-6 py-2 rounded-full ${
      link === selectedLink
        ? `bg-[#E6EEEA] dark:bg-[#39463E] dark:text-white`
        : ''
    } text-[39463E] dark:text-white`;

  const containerClasses = `flex flex-wrap justify-around mx-10
   md:mx-0 items-center p-3 dark:bg-[#39463E80] bg-white
  rounded-2xl`;

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
      <Add_new_category
        Icon={
          <GoPlusCircle
            size={30}
            className="text-[#148C59] dark:text-white text-xl cursor-pointer"
          />
        }
        ButtonStyle="bg-none"
      />
    </div>
  );
};

export default SubNav;
