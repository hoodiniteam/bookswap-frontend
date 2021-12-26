import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../helpers/locales";
import {AvatarComponent} from "../../components/avatars";
import Select from "react-select";
import Button from "../../components/UI/Button";
import {useMutation} from "urql";
import {UpdateUserMutation} from "../../graphql/UpdateUserMutation";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {GetMe} from "../../graphql/GetMe";
import { useTranslation } from 'next-i18next';
import { useAvatarOptions } from '../../helpers/avatarOptions';

const Avatar = () => {

  const [{data: meData, fetching}] = useQueryWrapper({
    query: GetMe,
  });
  const { hairOptions,
    eyeOptions,
    eyebrowOptions,
    mouthOptions,
    facialHairTypeOptions,
    facialHairColorOptions,
    hairColorOptions,
    hatColorOptions,
    skinColorOptions,
    clotheColorOptions,
    clotheTypeOptions,
    accessoriesTypeOptions, } = useAvatarOptions();
  const [avatarSelectOptions, setAvatarSelectOptions] = useState<any>({});
  const [avatarDisplayOptions, setAvatarDisplayOptions] = useState<any>(null);
  const [, updateUser] = useMutation(UpdateUserMutation);

  const saveAvatarHandler = async () => {
    await updateUser({
      avatar: avatarDisplayOptions
    })
  };

  const setSelectValues = (values:any) => {
    const topType = hairOptions.find(option => option.value === values['topType']);
    const eyeType = eyeOptions.find(option => option.value === values['eyeType']);
    const eyebrowType = eyeOptions.find(option => option.value === values['eyebrowType']);
    const mouthType = mouthOptions.find(option => option.value === values['mouthType']);
    const facialHairType = facialHairTypeOptions.find(option => option.value === values['facialHairType']);
    const facialHairColor = facialHairColorOptions.find(option => option.value === values['facialHairColor']);
    const hairColor = hairColorOptions.find(option => option.value === values['hairColor']);
    const hatColor = hatColorOptions.find(option => option.value === values['hatColor']);
    const skinColor = skinColorOptions.find(option => option.value === values['skinColor']);
    const clotheColor = clotheColorOptions.find(option => option.value === values['clotheColor']);
    const clotheType = clotheTypeOptions.find(option => option.value === values['clotheType']);
    const accessoriesType = accessoriesTypeOptions.find(option => option.value === values['accessoriesType']);
    const options = {
      topType,
      eyeType,
      eyebrowType,
      mouthType,
      facialHairType,
      facialHairColor,
      hairColor,
      hatColor,
      skinColor,
      clotheColor,
      clotheType,
      accessoriesType,
    }
    setAvatarSelectOptions(options);
  }

  useEffect(() => {
    const {user} = meData.me;
    if (user) {
      setAvatarDisplayOptions(user.avatar);
      setSelectValues(user.avatar);
    }
  }, [meData])

  const handleOptionChange = ({value, label}: any, {name}: any) => {
    setAvatarDisplayOptions({...(avatarDisplayOptions || {}), [name]: value});
    setAvatarSelectOptions({...avatarSelectOptions, [name]: {value, label}});
  };

  const randomChangedHandler = (values: any) => {
    setAvatarDisplayOptions(values);
    setSelectValues(values);
  };

  if (fetching) return <p>Loading...</p>;

  if (meData.me) {

    return (
      <div>
        <AvatarComponent
          className="mx-auto max-w-lg"
          avatarStyle='Circle'
          random={true}
          customizable={true}
          onRandomChanged={randomChangedHandler}
          {...avatarDisplayOptions}
        />
        <div className="avatar-selectors overflow-auto sm:overflow-visible grid gap-4 pt-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Волосы и Головные уборы</label>
            <Select
              placeholder="Волосы и Головные уборы"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["topType"]}
              name="topType"
              options={hairOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Глаза</label>
            <Select
              placeholder="Глаза"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["eyeType"]}
              name="eyeType"
              options={eyeOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Брови</label>
            <Select
              placeholder="Брови"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["eyebrowType"]}
              name="eyebrowType"
              options={eyebrowOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Рот</label>
            <Select
              placeholder="Рот"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["mouthType"]}
              name="mouthType"
              options={mouthOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Волосы на лице</label>
            <Select
              placeholder="Волосы на лице"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["facialHairType"]}
              name="facialHairType"
              options={facialHairTypeOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Цвет волос на лице</label>
            <Select
              placeholder="Цвет волос на лице"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["facialHairColor"]}
              name="facialHairColor"
              options={facialHairColorOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Цвет волос на голове</label>
            <Select
              placeholder="Цвет волос на голове"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["hairColor"]}
              name="hairColor"
              options={hairColorOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Цвет головного убора</label>
            <Select
              placeholder="Цвет головного убора"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["hatColor"]}
              name="hatColor"
              options={hatColorOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Цвет кожи</label>
            <Select
              placeholder="Цвет кожи"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["skinColor"]}
              name="skinColor"
              options={skinColorOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Цвет одежды</label>
            <Select
              placeholder="Цвет одежды"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["clotheColor"]}
              name="clotheColor"
              options={clotheColorOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Одежда</label>
            <Select
              placeholder="Одежда"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["clotheType"]}
              name="clotheType"
              options={clotheTypeOptions}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Аксессуары</label>
            <Select
              placeholder="Аксессуары"
              classNamePrefix="select"
              isSearchable
              value={avatarSelectOptions["accessoriesType"]}
              name="accessoriesType"
              options={accessoriesTypeOptions}
              onChange={handleOptionChange}
            />
          </div>
        </div>
        <div className="flex mt-4 justify-end">
          <Button onClick={saveAvatarHandler}>Сохранить</Button>
        </div>
      </div>
    )
  }
  return null;
}

Avatar.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Настройка аватара">
      {page}
    </Layout>
  )
}

export const getServerSideProps = async ({locale}: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default Avatar;
