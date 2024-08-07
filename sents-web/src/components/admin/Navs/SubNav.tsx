/* eslint-disable no-unused-vars */
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPlusCircle } from 'react-icons/go';

import Add_new_category from '@/components/admin/forms/Add_new_category';
import useOutsideClick from '@/hooks/useOutsideClick';
import { CustomSession } from '@/utils/types';

interface SubNavProps {
  links: string[];
  selectedLink: string;
  bgColor?: boolean;
  addCat?: boolean;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({ links, selectedLink, setSelectedLink, bgColor, addCat }: SubNavProps) => {
  const [visibleLinks, setVisibleLinks] = useState(links);
  const [dropdownLinks, setDropdownLinks] = useState<string[]>([]);
  const { data: session } = useSession() as {
    data: CustomSession;
  };
  const isAdmin = session?.user?.role === 'ADMIN';

  const [showDropdown, setShowDropdown] = useState(false);
  const dropRef = useRef(null);
  const containerRef = useRef<any>(null);

  useOutsideClick(dropRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    const checkContainerSize = () => {
      const isSmallScreen = containerRef.current?.offsetWidth < 500;
      if (isSmallScreen) {
        if (links.length > 2) {
          setVisibleLinks(links.slice(0, 2));
          setDropdownLinks(links.slice(2));
        } else {
          setVisibleLinks(links);
          setDropdownLinks([]);
        }
      } else {
        if (links.length > 5) {
          setVisibleLinks(links.slice(0, 5));
          setDropdownLinks(links.slice(5));
        } else {
          setVisibleLinks(links);
          setDropdownLinks([]);
        }
      }
    };

    checkContainerSize();
    window.addEventListener('resize', checkContainerSize);

    return () => window.removeEventListener('resize', checkContainerSize);
  }, [links]);

  const linkClasses = (link: string) =>
    `text-sm md:text-md cursor-pointer px-2 md:px-6 py-2 rounded-full ${
      link === selectedLink
        ? `${bgColor ? 'bg-[#E6EEEA] dark:bg-[#39463E] dark:text-white' : 'bg-green-700 text-white hover:bg-green-800'} `
        : ''
    } text-[39463E] dark:text-white hover:dark:text-black hover:bg-[#E6EEEA]`;

  const dropdownLinkClasses = `text-sm md:text-md cursor-pointer px-2 md:px-6 py-2 dark:text-white hover:dark:text-black hover:bg-[#E6EEEA] hover:bg-gray-300 `;

  const containerClasses = `flex flex-wrap justify-around mx-10
   md:mx-0 items-center p-3 dark:bg-[#39463E80] ${bgColor ? `${addCat ? 'bg-white' : 'dark:bg-[#0E120F] bg-[#F8FAF9] dark:text-white'}` : 'bg-white'}
  rounded-2xl`;

  return (
    <div className={containerClasses} ref={containerRef}>
      {visibleLinks.map((link: any, index: any) => (
        <div
          key={index + 1}
          className={linkClasses(link)}
          onClick={() => setSelectedLink(link)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedLink(link);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {link}
        </div>
      ))}
      {dropdownLinks.length > 0 && (
        <div className="relative">
          <button
            type="button"
            className="dark:text-white mt-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <BsThreeDotsVertical size={25} />
          </button>
          {showDropdown && (
            <div
              className="absolute z-50 right-0 rounded-xl shadow-md bg-[#e6eeea] dark:bg-[#39463E] max-h-[200px] overflow-y-auto"
              style={{
                width: 'max-content',
              }}
              ref={dropRef}
            >
              {dropdownLinks.map((link) => (
                <div
                  key={link}
                  className={dropdownLinkClasses}
                  onClick={() => setSelectedLink(link)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedLink(link);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {link}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isAdmin && addCat && (
        <Add_new_category
          Icon={
            <GoPlusCircle
              size={30}
              className="text-[#148C59] dark:text-white text-xl cursor-pointer"
            />
          }
          ButtonStyle="bg-none"
        />
      )}
    </div>
  );
};

export default SubNav;
