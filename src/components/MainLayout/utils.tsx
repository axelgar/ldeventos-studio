import { INTERNAL_PREFIX } from '@/config';
import { ArrayElement } from '@/utils/array-elements';
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
import { NextRouter } from 'next/router';

export const isCurrent = (item: ArrayElement<typeof navigation>, router: NextRouter) => {
  return item.children.some((subItem) => {
    const isHomePage = router.pathname === INTERNAL_PREFIX;
    if (isHomePage) {
      return subItem.pathname === router.pathname;
    }
    return subItem.href.includes(router.pathname.split(INTERNAL_PREFIX)[1]);
  });
};

export const navigation = [
  {
    name: 'Projects',
    icon: FolderIcon,
    children: [
      { name: 'See projects', href: '/', pathname: INTERNAL_PREFIX, icon: FolderIcon },
      // {
      //   name: 'Add new project',
      //   href: '/add-project',
      //   pathname: INTERNAL_PREFIX + '/add-project',
      //   icon: FolderPlusIcon,
      // },
      // {
      //   name: 'See project types',
      //   href: '/project-types',
      //   pathname: INTERNAL_PREFIX + '/project-types',
      //   icon: Squares2X2Icon,
      // },
      // {
      //   name: 'Add new project type',
      //   href: '/project-types/add-project-type',
      //   pathname: INTERNAL_PREFIX + '/project-types/add',
      //   icon: SquaresPlusIcon,
      // },
    ],
  },
  {
    name: 'Users',
    icon: UsersIcon,
    children: [
      { name: 'See users', href: '/users', pathname: INTERNAL_PREFIX + '/users', icon: UsersIcon },
      {
        name: 'Add a new user',
        href: '/users/add',
        pathname: INTERNAL_PREFIX + '/users/add',
        icon: UserPlusIcon,
      },
      // {
      //   name: 'See project roles',
      //   href: '/project-roles',
      //   pathname: INTERNAL_PREFIX + '/project-roles',
      //   icon: AcademicCapIcon,
      // },
      // {
      //   name: 'Add a new project role',
      //   href: '/project-roles/add-project-role',
      //   pathname: INTERNAL_PREFIX + '/project-roles/add',
      //   icon: PlusIcon,
      // },
    ],
  },
  {
    name: 'Providers',
    icon: WrenchScrewdriverIcon,
    children: [
      {
        name: 'See providers',
        href: '/providers',
        pathname: INTERNAL_PREFIX + '/providers',
        icon: WrenchScrewdriverIcon,
      },
      {
        name: 'Add a new provider',
        href: '/providers/add',
        pathname: INTERNAL_PREFIX + '/providers/add',
        icon: PlusIcon,
      },
      // { name: 'Calendar', href: '#' },
      // { name: 'Settings', href: '#' },
    ],
  },
  {
    name: 'Promoters',
    icon: UserGroupIcon,
    children: [
      {
        name: 'See promoters',
        href: '/promoters',
        pathname: INTERNAL_PREFIX + '/promoters',
        icon: UserGroupIcon,
      },
      {
        name: 'Add a new promoter',
        href: '/promoters/add',
        pathname: INTERNAL_PREFIX + '/promoters/add',
        icon: PlusIcon,
      },
    ],
  },
  // {
  //   name: 'Venues',
  //   icon: BuildingOfficeIcon,
  //   children: [
  //     { name: 'See all venues', href: '#' },
  //     { name: 'Add a new venue', href: '#' },
  //   ],
  // },
];
