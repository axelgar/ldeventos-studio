import { NextComponentType, NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import { PageSpinner } from './PageSpinner';

type Props = {
  children: NextComponentType<NextPageContext, any, any>;
};

export const Auth = ({ children }: Props) => {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return <>{children}</>;
};
