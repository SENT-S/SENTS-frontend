'use client';
import React, { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link';
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineLightMode } from 'react-icons/md';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { IoIosLogOut } from 'react-icons/io';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div className=" bg-white shadow py-4 rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl dark:bg-[#39463E80]">
        <div className="px-4 flex justify-between items-center space-x-4 md:space-x-0">
          <div className="lg:hidden">
            <Link href="/dashboard">
              <h1 className="text-xl lg:text-2xl Unigoe-font text-[#0D4222] dark:text-[#E6F6F0] font-bold">
                SENTS.
              </h1>
            </Link>
          </div>
          <div className="flex items-center text-gray-400 bg-gray-100 max-md:bg-black py-2 rounded-lg w-full md:w-1/3 overflow-hidden dark:bg-[#39463E80]">
            <div className="ml-3">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search for stocks & more"
              className="flex-grow max-md:text-sm px-2 py-1 w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="hidden md:flex items-center lg:pr-14">
            <button
              className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <MdOutlineLightMode size={20} />
              ) : (
                <BsFillMoonStarsFill size={20} />
              )}
            </button>
            <div className="flex items-center ml-4">
              <Avatar>
                <AvatarImage src="https://source.unsplash.com/100x100/?user" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2 dark:text-white">
                <p className="font-bold">User Name</p>
                <p className="text-sm text-gray-500">user.email@example.com</p>
              </div>
            </div>
          </div>

          {/* mobile & tablet drawer */}
          <div className="md:hidden">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button className="cursor-pointer">
                  <IoIosMenu className="bg-gray-100 py-1 px-2 dark:bg-[#39463E80] dark:text-white w-12 h-[30px] rounded-[40px]" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#E6EEEA] flex flex-col items-center rounded-none">
                <DrawerHeader className="mx-auto w-full space-y-4 max-w-sm">
                  <div className="flex justify-between items-center">
                    <Link href="/dashboard">
                      <h1 className="text-2xl Unigoe-font text-[#0D4222] font-bold">
                        SENTS.
                      </h1>
                    </Link>
                    <DrawerClose>
                      <IoClose size={20} />
                    </DrawerClose>
                  </div>
                  <div className="flex flex-col justify-start">
                    <Avatar>
                      <AvatarImage src="https://source.unsplash.com/100x100/?user" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="mt-3 text-start">
                      <p className="font-bold">User Name</p>
                      <p className="text-sm text-gray-500">
                        user.email@example.com
                      </p>
                    </div>
                  </div>
                </DrawerHeader>
                <div className="flex flex-col justify-between h-full pb-4">
                  <div />
                  <button
                    onClick={() => {
                      router.push('/landing');
                    }}
                    className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
                  >
                    <IoIosLogOut size={24} />
                    <p>Logout</p>
                  </button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
