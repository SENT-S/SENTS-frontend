'use client';
import Link from 'next/link';
import React from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { IoIosMenu } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineLightMode } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import { UserLinks, AdminLinks } from '@/utils/Links';
import { CustomSession } from '@/utils/types';

interface CustomDrawerProps {
  status: string;
  isActive: (path: string) => boolean;
  isAdmin: boolean;
  session: CustomSession;
  loading: boolean;
  handleLogout: () => void;
  toggleTheme: () => void;
}

const CustomDrawer = ({
  status,
  isAdmin,
  session,
  loading,
  handleLogout,
  toggleTheme,
  isActive,
}: CustomDrawerProps) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button type="button">
          <IoIosMenu className="bg-gray-100 py-1 px-2 dark:bg-[#39463E80] dark:text-white w-12 h-[30px] rounded-[40px]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#E6EEEA] flex flex-col items-center rounded-none">
        <DrawerHeader className="mx-auto w-full space-y-4 max-w-sm">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <h1 className="text-2xl Unigoe-font text-[#0D4222] font-bold">SENTS.</h1>
            </Link>
            <DrawerClose>
              <IoClose size={20} />
            </DrawerClose>
          </div>
          {status === 'loading' ? (
            <div className="flex flex-col justify-start">
              <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px] bg-gray-200 dark:bg-[#0e120f]" />
                <Skeleton className="h-4 w-[150px] bg-gray-200 dark:bg-[#0e120f]" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-start">
              <Avatar style={{ boxShadow: '0 0 0 1px #148c59' }}>
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mt-3 text-start">
                <p className="font-bold">{session?.user?.name}</p>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
          )}
          <div className="w-full flex justify-start">
            <Button
              type="button"
              className="p-2 bg-gray-100 rounded-full text-black dark:text-white dark:bg-[#39463E80]"
              onClick={toggleTheme}
            >
              <MdOutlineLightMode size={20} className="hidden dark:block" />
              <BsFillMoonStarsFill size={20} className="dark:hidden" />
            </Button>
          </div>
          <div className="w-full space-y-3">
            {(isAdmin ? AdminLinks : UserLinks).map((link, index) => {
              const Icon = link.icon;
              const isActiveLink = link.activePaths.some(isActive);
              return (
                <Button
                  type="button"
                  key={index}
                  className={`flex w-full  justify-center items-center rounded-md space-x-2 px-4 py-2 relative ${
                    isActiveLink ? 'bg-[#39463E] text-white hover:bg-[#39463edc]' : ''
                  }`}
                  disabled={link.disable}
                >
                  <Link href={link.path} className="flex gap-3 justify-start items-center w-full">
                    <Icon size={24} className="text-[#148c59]" />
                    <span className="text-lg">{link.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </DrawerHeader>
        <div className="flex flex-col justify-between h-full pb-4">
          <div />
          <Button
            type="button"
            onClick={() => {
              handleLogout();
            }}
            className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
          >
            <IoIosLogOut size={24} />
            <span>
              {loading ? (
                <ScaleLoader color="#a3a3a3" loading={loading} height={16} className="mt-1" />
              ) : (
                'Logout'
              )}
            </span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
