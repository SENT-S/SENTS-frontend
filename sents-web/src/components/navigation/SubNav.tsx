'use client';
import React, { useState } from 'react';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({ links, selectedLink, setSelectedLink }: SubNavProps) => {
  return (
    <div className="flex justify-around items-center p-3 bg-white rounded-2xl">
      {links.map(link => (
        <div
          key={link}
          className={`text-lg cursor-pointer px-6 py-2 rounded-2xl ${link === selectedLink ? 'bg-green-700 text-white' : ''} text-gray-300`}
          onClick={() => setSelectedLink(link)}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default SubNav;
