import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SiteIndex() {
  const { data: session } = useSession();
  const { query, push } = useRouter<'/sites/[subdomain]'>();

  return <main>test</main>;
}

SiteIndex.auth = {};
