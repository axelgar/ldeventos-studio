import { classNames } from '@/utils/classnames';
import { Role } from '@prisma/client';

type Props = {
  children: Role;
};

const roleToColor: Record<Role, string> = {
  ADMIN: 'bg-green-100 text-green-800',
  MEMBER: 'bg-yellow-100 text-yellow-800',
  EXTERNAL: 'bg-blue-100 text-blue-800',
};

export const RolesBudge = ({ children }: Props) => (
  <span className={classNames(roleToColor[children], 'inline-flex rounded-full  px-2 text-xs font-semibold leading-5')}>
    {children}
  </span>
);
