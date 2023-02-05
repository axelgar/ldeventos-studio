import { INTERNAL_PREFIX } from '@/config';
import {
  FolderIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Projects',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'See all projects', href: '/', pathname: INTERNAL_PREFIX },
      { name: 'Add new project', href: '/add-event' },
      { name: 'See all project types', href: '/project-types' },
      { name: 'Add new project type', href: '/project-types/create' },
    ],
  },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'See all users', href: '/users', pathname: INTERNAL_PREFIX + '/users' },
      { name: 'Add a new user', href: '/users/add-user', pathname: INTERNAL_PREFIX + '/users' },
      { name: 'See available event roles', href: '#' },
      { name: 'Add a new event role', href: '#' },
    ],
  },
  {
    name: 'Providers',
    icon: WrenchScrewdriverIcon,
    current: false,
    children: [
      { name: 'See all providers', href: '#' },
      { name: 'Add a new provider', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
  {
    name: 'Promoters',
    icon: UserGroupIcon,
    current: false,
    children: [
      { name: 'See all promoters', href: '#' },
      { name: 'Add a new promoter', href: '#' },
    ],
  },
  {
    name: 'Venues',
    icon: BuildingOfficeIcon,
    current: false,
    children: [
      { name: 'See all venues', href: '#' },
      { name: 'Add a new venue', href: '#' },
    ],
  },
];
