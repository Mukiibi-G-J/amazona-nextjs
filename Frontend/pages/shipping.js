import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Store } from '../utils/store';

function Shipping() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  if (!userInfo) {
    router.push('/login?redirect=/shipping');

    return;
  }

  return <div>shipping</div>;
}

export default Shipping;
