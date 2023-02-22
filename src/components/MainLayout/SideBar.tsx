import { classNames } from '@/utils/classnames';
import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
import { isCurrent, navigation } from './utils';

export const SideBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-grow flex-col overflow-y-auto bg-orange-500 pt-5 pb-4">
      <div className="flex flex-shrink-0 items-center px-4">
        <img
          className="h-8 w-auto"
          src="https://www.ldeventos.com/wp-content/uploads/2014/07/logo-LD_3.png"
          alt="LDEventos"
        />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 bg-orange-500 px-2" aria-label="Sidebar">
          {navigation.map((item) =>
            !item.children ? (
              <div key={item.name}>
                <a
                  href={'#'}
                  className={classNames(
                    'bg-orange-100 text-orange-600 hover:bg-orange-50 hover:text-white',
                    'group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium'
                  )}
                >
                  <item.icon
                    className={classNames('text-white group-hover:text-orange-400', 'mr-3 h-6 w-6 flex-shrink-0')}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </div>
            ) : (
              <Disclosure as="div" key={item.name} className="space-y-1" defaultOpen={isCurrent(item, router)}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        isCurrent(item, router)
                          ? 'bg-orange-900 text-white'
                          : 'bg-orange-700 text-white hover:bg-orange-50 hover:text-gray-900',
                        'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isCurrent(item, router) ? 'text-white' : 'text-white group-hover:text-orange-500',
                          'mr-3 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{item.name}</span>
                      <svg
                        className={classNames(
                          open ? 'rotate-90' : '',
                          isCurrent(item, router) ? 'text-white' : 'text-white group-hover:text-orange-400',
                          'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out'
                        )}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {item.children.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-900"
                        >
                          {subItem.icon && (
                            <subItem.icon
                              className={classNames(
                                'text-white group-hover:text-gray-900',
                                'mr-3 h-6 w-6 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          )}
                          <span className="flex-1">{subItem.name}</span>
                        </a>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )
          )}
        </nav>
      </div>
    </div>
  );
};
