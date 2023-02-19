import { classNames } from '@/utils/classnames';
import { Menu, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { AvatarPlaceholder } from '../AvatarPlaceholder';

const userNavigation = [{ name: 'Your Profile', href: '#' }];

export const ProfileDropdown = () => {
  const { data: session } = useSession();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {session?.user.image ? (
            <img className="h-8 w-8 rounded-full object-cover" src={session?.user.image} alt="" />
          ) : (
            <AvatarPlaceholder size="s" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block w-full px-4 py-2 text-start text-sm text-gray-700'
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
