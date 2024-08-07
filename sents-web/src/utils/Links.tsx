import { CiSettings } from 'react-icons/ci';
import { FaUserShield } from 'react-icons/fa6';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { LuLayoutDashboard } from 'react-icons/lu';

import Apple from '@/public/icons/apple.png';
import Google from '@/public/icons/google.png';
import Microsoft from '@/public/icons/micro.png';

export const defaultSocialButtons = [
  { id: 'apple', icon: Apple, name: 'Apple' },
  { id: 'google', icon: Google, name: 'Google' },
  { id: 'microsoft', icon: Microsoft, name: 'Microsoft' },
];

export const UserLinks = [
  {
    name: 'Dashboard',
    icon: LuLayoutDashboard,
    path: '/dashboard',
    activePaths: ['/dashboard', '/company'],
    disable: false,
  },
  {
    name: 'News',
    icon: HiOutlineNewspaper,
    path: '/news',
    activePaths: ['/news'],
    disable: false,
  },
];

export const AdminLinks = [
  {
    name: 'Dashboard',
    icon: LuLayoutDashboard,
    path: '/dashboard',
    activePaths: ['./', '/dashboard', '/company', 'new_company', 'edit_company'],
    disable: false,
  },
  {
    name: 'News',
    icon: HiOutlineNewspaper,
    path: '/news',
    activePaths: ['/news', 'create_news'],
    disable: false,
  },
  {
    name: 'Authorizations',
    icon: FaUserShield,
    path: '#',
    activePaths: ['#'],
    disable: true,
  },
  {
    name: 'Settings',
    icon: CiSettings,
    path: '#',
    activePaths: ['#'],
    disable: true,
  },
];
