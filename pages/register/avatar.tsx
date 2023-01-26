import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '@/helpers/locales';
import { LogoLogin } from '@/components/LogoLogin';
import { AvatarSettings } from '@/components/AvatarSettings';

const Avatar = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="container mx-auto space-y-8">
        <div>
          <div className="flex justify-center">
            <LogoLogin />
          </div>
          <h1 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            Настройте свой аватар
          </h1>
        </div>
        <AvatarSettings nextButtonTitle={"Продолжить"} showSkip={true} />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Avatar;
