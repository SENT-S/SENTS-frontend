import React from 'react';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({ links, selectedLink, setSelectedLink }: SubNavProps) => {
  return (
    <div className="flex flex-wrap justify-around mx-10 md:mx-0 items-center p-3 bg-white dark:bg-[#39463E80] rounded-2xl overflow-auto">
      {links.map(link => (
        <div
          key={link}
          className={`text-sm md:text-lg cursor-pointer px-2 md:px-6 py-2 rounded-2xl ${link === selectedLink ? 'bg-green-700 text-white' : ''} text-gray-300`}
          onClick={() => setSelectedLink(link)}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default SubNav;
