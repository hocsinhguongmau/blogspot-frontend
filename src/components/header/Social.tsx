import React, { ReactElement } from 'react';
import Link from 'next/link';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';

interface Props {}

export default function Social({}: Props): ReactElement {
  return (
    <ul className="social">
      <li>
        <Link href="/">
          <a>
            <FaFacebook />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>
            <FaFacebook />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>
            <FaFacebook />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>
            <FaFacebook />
          </a>
        </Link>
      </li>
    </ul>
  );
}
