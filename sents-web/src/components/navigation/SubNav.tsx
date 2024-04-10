import React from 'react';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({ links, selectedLink, setSelectedLink }: SubNavProps) => {
  return (
    <div className="flex flex-wrap justify-around items-center p-2 md:p-3 bg-white rounded-2xl overflow-auto">
      {links.map(link => (
        <div
          key={link}
          className={`text-sm md:text-lg cursor-pointer px-2 md:px-6 py-1 md:py-2 rounded-2xl ${link === selectedLink ? 'bg-green-700 text-white' : ''} text-gray-300`}
          onClick={() => setSelectedLink(link)}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default SubNav;
