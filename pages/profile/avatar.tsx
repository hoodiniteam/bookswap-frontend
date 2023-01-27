import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { AvatarSettings } from '@/components/AvatarSettings';

const Avatar = () => {
  return <AvatarSettings />
};

Avatar.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Настройка аватара">{page}</Layout>;
};
export default Avatar;
