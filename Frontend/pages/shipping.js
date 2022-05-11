import { useRouter } from 'next/router';
import React from 'react';

function Shipping() {
  const router = useRouter();
  const login = false;
  if (!login) {
    router.push('/login');

    return;
  }

  return <div>shipping</div>;
}

export default Shipping;
