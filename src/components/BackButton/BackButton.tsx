import React from 'react';
import { useRouter } from 'next/router';
import Arrow from 'icons/Arrow';

import css from './BackButton.module.scss';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => router.back();

  return (
    <button type="button" onClick={onClick} className={css.arrowBack}>
      <Arrow className={css.arrowBackIcon} />
    </button>
  );
};

export default BackButton;
