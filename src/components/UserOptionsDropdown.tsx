import { Dispatch, Fragment, SetStateAction } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/utils/classnames';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

type Props = {
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export const UserOptionsDropdown = ({ setOpenDeleteModal }: Props) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="h-10 w-10 p-2.5">
        <EllipsisHorizontalIcon />
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
      <Menu.Items className="fixed z-10 -ml-52 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:-ml-52">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex w-full items-center px-4 py-2 text-sm'
                )}
              >
                <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                Edit
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setOpenDeleteModal(true)}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex w-full items-center px-4 py-2 text-sm'
                )}
              >
                <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                Delete
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);