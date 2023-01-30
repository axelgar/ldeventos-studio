import { useSession, signIn, signOut } from 'next-auth/react';

export default function Example() {
  const { data: session, status } = useSession();

  return (
    <main>
      {session?.user ? (
        <button onClick={() => signOut()}>👋 Hello {session.user.name}, Sing out</button>
      ) : (
        <button onClick={() => signIn()}>Sing in</button>
      )}
    </main>
  );
}
