import {useRouter} from "next/router";
import React, {ReactElement} from "react";
import Layout from "../../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../../helpers/locales";

const Room = () => {
  const router = useRouter()
  const {rid} = router.query;
  return (
    <div>Room {rid}</div>
  )
}

Room.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Room;
