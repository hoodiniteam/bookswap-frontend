import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AvatarSettings } from '@/components/AvatarSettings';
import { localesList } from '@/helpers/locales';

const Avatar = () => {
  return <AvatarSettings />
};

Avatar.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Настройка аватара">{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Avatar;
