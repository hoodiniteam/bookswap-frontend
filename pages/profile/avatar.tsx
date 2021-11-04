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

const Avatar = () => {

  const [{data: meData, fetching}] = useQueryWrapper({
    query: GetMe,
  });
  const [defaultAvatarOptions, setDefaultAvatarOptions] = useState<any>({});
  const [avatarOptions, setAvatarOptions] = useState({});
  const [, updateUser] = useMutation(UpdateUserMutation);

  const saveAvatarHandler = async () => {
    await updateUser({
      avatar: avatarOptions
    })
  };

  useEffect(() => {
    const {user} = meData.me;
    if (user) {
      setDefaultAvatarOptions(user.avatar);
      setAvatarOptions(user.avatar);
    }
  }, [meData])

  const hairOptions = [
    {value: 'NoHair', label: 'Без волос'},
    {value: 'Hat', label: 'Шляпа'},
  ];

  const eyeOptions = [
    {value: 'Close', label: 'Закрытые'},
    {value: 'Cry', label: 'Слеза'},
  ];

  const eyebrowOptions = [
    {value: 'Angry', label: 'Злые'},
    {value: 'AngryNatural', label: 'Злые натуральные'},
  ];

  const mouthOptions = [
    {value: 'Concerned', label: 'Обеспокоенный'},
    {value: 'Disbelief', label: 'Недоверчивый'},
  ];

  const facialHairTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'BeardMedium', label: 'Борода средняя'},
  ];

  const facialHairColorOptions = [
    {value: 'Auburn', label: 'Каштановый'},
    {value: 'Black', label: 'Черный'},
    {value: 'Blonde', label: 'Блонди'},
  ];

  const hairColorOptions = [
    {value: 'Auburn', label: 'Каштановый'},
    {value: 'Black', label: 'Черный'},
    {value: 'Blonde', label: 'Блонди'},
  ];

  const hatColorOptions = [
    {value: 'Black', label: 'Черный'},
    {value: 'Blue01', label: 'Черный 1'},
    {value: 'Blue02', label: 'Черный 2'},
  ];

  const skinColorOptions = [
    {value: 'Tanned', label: 'Загорелый'},
    {value: 'Yellow', label: 'Желтый'},
    {value: 'Pale', label: 'Бледный'},
  ];

  const clotheColorOptions = [
    {value: 'Black', label: 'Черный'},
    {value: 'Blue01', label: 'Черный 1'},
    {value: 'Blue02', label: 'Черный 2'},
  ];

  const clotheTypeOptions = [
    {value: 'BlazerShirt', label: 'Блейзер'},
    {value: 'BlazerSweater', label: 'Блейзер-свитер'},
  ];

  const accessoriesTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'Kurt', label: 'Курт'},
  ];


  const handleOptionChange = ({value}: any, {name}: any) => {
    setAvatarOptions({...avatarOptions, [name]: value});
  };

  if (fetching) return <p>Loading...</p>;

  if (meData.me) {

    const defaultTop = hairOptions.find(option => option.value === defaultAvatarOptions['topType']);
    const defaultEye = eyeOptions.find(option => option.value === defaultAvatarOptions['eyeType'])
    const defaultEyebrow = eyeOptions.find(option => option.value === defaultAvatarOptions['eyebrowType'])
    const defaultMouthType = mouthOptions.find(option => option.value === defaultAvatarOptions['mouthType'])
    const defaultFacialHairType = facialHairTypeOptions.find(option => option.value === defaultAvatarOptions['facialHairType'])
    const defaultFacialHairColor = facialHairColorOptions.find(option => option.value === defaultAvatarOptions['facialHairColor'])
    const defaultHairColor = hairColorOptions.find(option => option.value === defaultAvatarOptions['hairColor'])
    const defaultHatColor = hatColorOptions.find(option => option.value === defaultAvatarOptions['hatColor'])
    const defaultSkinColor = skinColorOptions.find(option => option.value === defaultAvatarOptions['skinColor'])
    const defaultClotheColor = clotheColorOptions.find(option => option.value === defaultAvatarOptions['clotheColor'])
    const defaultClotheType = clotheTypeOptions.find(option => option.value === defaultAvatarOptions['clotheType'])
    const defaultAccessoriesType = accessoriesTypeOptions.find(option => option.value === defaultAvatarOptions['accessoriesType'])

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
              defaultValue={defaultTop}
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
              defaultValue={defaultEye}
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
              defaultValue={defaultEyebrow}
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
              defaultValue={defaultMouthType}
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
              defaultValue={defaultFacialHairType}
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
              defaultValue={defaultFacialHairColor}
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
              defaultValue={defaultHairColor}
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
              defaultValue={defaultHatColor}
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
              defaultValue={defaultSkinColor}
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
              defaultValue={defaultClotheColor}
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
              defaultValue={defaultClotheType}
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
              defaultValue={defaultAccessoriesType}
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
