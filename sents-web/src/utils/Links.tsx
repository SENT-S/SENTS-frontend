import { CiSettings } from 'react-icons/ci';
import { FaUserShield } from 'react-icons/fa6';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { LuLayoutDashboard } from 'react-icons/lu';

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
