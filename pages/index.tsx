import React from "react";
import Link from 'next/link';

export default function Index() {
  return (
    <div>
      Promo page
      <Link href="/home">
        <a>Home</a>
      </Link>

      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  )
}
