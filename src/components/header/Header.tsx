import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@components/header/Search';
import Social from '@components/header/Social';
import Navigation from '@components/header/Navigation';

export default function Header(): ReactElement {
  return (
    <header className="header">
      <div className="header__top">
        <Search />
        <Link href="/">
          <a>
            <Image src="/images/logo.svg" alt="Logo" width={68} height={34} />
          </a>
        </Link>
        <Social />
      </div>
      <div className="header__bottom">
        <Navigation />
      </div>
    </header>
  );
}
