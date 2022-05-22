import React from "react";
import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <Link href="/register">
        <a>Register</a>
      </Link>

      <Link href="/home">
        <a>Home</a>
      </Link>

      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  )
}
