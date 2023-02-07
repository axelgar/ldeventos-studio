import { classNames } from '@/utils/classnames';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

type Props = {
  size?: Size;
};

const sizeToClassName: Record<Size, string> = {
  xs: 'h-6 w-6',
  s: 'h-8 w-8',
  m: 'h-10 w-10',
  l: 'h-12 w-12',
  xl: 'h-14 w-14',
};

export const AvatarPlaceholder = ({ size = 'm' }: Props) => (
  <span className={classNames(sizeToClassName[size], 'inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100')}>
    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </span>
);