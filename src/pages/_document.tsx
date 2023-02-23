import { Html, Head, Main, NextScript } from 'next/document';

// TODO create seed files for db testing

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-gray-100">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
