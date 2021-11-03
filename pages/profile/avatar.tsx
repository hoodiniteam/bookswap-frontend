import React, {ReactElement, useContext, useState} from "react";
import Layout from "../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../helpers/locales";
import {AvatarComponent, MyOptionContext} from "../../components/avatars";
import Select from "react-select";

const Avatar = () => {

  const [avatarOptions, setAvatarOptions] = useState({});
  const context = useContext(MyOptionContext);
  const hairOptions = [
    { value: 'NoHair', label: 'Без волос' },
    { value: 'Hat', label: 'Шляпа' },
  ];

  const handleOptionChange = ({value}: any, {name}: any) => {
    setAvatarOptions({...avatarOptions, [name]: value});
  };

  return (
  <div>
    <AvatarComponent
      className="mx-auto"
      avatarStyle='Circle'
      {...avatarOptions}
    />
    <div className="grid gap-4 pt-4 grid-cols-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Волосы и Головные уборы</label>
        <Select
          placeholder="Волосы и Головные уборы"
          classNamePrefix="select"
          isSearchable
          name="topType"
          options={hairOptions}
          onChange={handleOptionChange}
        />
      </div>
    </div>
  </div>
  )
}

Avatar.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Настройка аватара">
      {page}
    </Layout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default Avatar;
