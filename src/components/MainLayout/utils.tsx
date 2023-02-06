import { INTERNAL_PREFIX } from '@/config';
import {
  FolderIcon,
  FolderPlusIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  UserPlusIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  AcademicCapIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Projects',
    icon: FolderIcon,
    children: [
      { name: 'See projects', href: '/', pathname: INTERNAL_PREFIX, icon: FolderIcon },
      { name: 'Add new project', href: '/add-event', pathname: INTERNAL_PREFIX, icon: FolderPlusIcon },
      { name: 'See project types', href: '/project-types', pathname: INTERNAL_PREFIX, icon: Squares2X2Icon },
      { name: 'Add new project type', href: '/project-types/create', pathname: INTERNAL_PREFIX, icon: SquaresPlusIcon },
    ],
  },
  {
    name: 'Users',
    icon: UsersIcon,
    children: [
      { name: 'See users', href: '/users', pathname: INTERNAL_PREFIX + '/users', icon: UsersIcon },
      { name: 'Add a new user', href: '/users/add-user', pathname: INTERNAL_PREFIX + '/users', icon: UserPlusIcon },
      { name: 'See event roles', href: '#', pathname: INTERNAL_PREFIX, icon: AcademicCapIcon },
      { name: 'Add a new event role', href: '#', pathname: INTERNAL_PREFIX, icon: PlusIcon },
    ],
  },
  // {
  //   name: 'Providers',
  //   icon: WrenchScrewdriverIcon,
  //   children: [
  //     { name: 'See providers', href: '#' },
  //     { name: 'Add a new provider', href: '#' },
  //     { name: 'Calendar', href: '#' },
  //     { name: 'Settings', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Promoters',
  //   icon: UserGroupIcon,
  //   children: [
  //     { name: 'See all promoters', href: '#' },
  //     { name: 'Add a new promoter', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Venues',
  //   icon: BuildingOfficeIcon,
  //   children: [
  //     { name: 'See all venues', href: '#' },
  //     { name: 'Add a new venue', href: '#' },
  //   ],
  // },
];
