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

const Avatar = () => {

  const [{data: meData, fetching}] = useQueryWrapper({
    query: GetMe,
  });
  const { t } = useTranslation(localesList);
  const [avatarSelectOptions, setAvatarSelectOptions] = useState<any>({});
  const [avatarDisplayOptions, setAvatarDisplayOptions] = useState<any>(null);
  const [, updateUser] = useMutation(UpdateUserMutation);

  const saveAvatarHandler = async () => {
    await updateUser({
      avatar: avatarDisplayOptions
    })
  };

  const hairOptions = [
    {value: 'NoHair', label: 'Без волос'},
    {value: 'Hat', label: 'Шляпа'},
    {value: 'Hijab', label: 'Hijab'},
    {value: 'Eyepatch', label: 'Eyepatch'},
    {value: 'LongHairBigHair', label: 'LongHairBigHair'},
    {value: 'LongHairBob', label: 'LongHairBob'},
    {value: 'LongHairBun', label: 'LongHairBun'},
    {value: 'LongHairCurly', label: 'LongHairCurly'},
    {value: 'LongHairCurvy', label: 'LongHairCurvy'},
    {value: 'LongHairDreads', label: 'LongHairDreads'},
    {value: 'LongHairFrida', label: 'LongHairFrida'},
    {value: 'LongHairFro', label: 'LongHairFro'},
    {value: 'LongHairFroBand', label: 'LongHairFroBand'},
    {value: 'LongHairMiaWallace', label: 'LongHairMiaWallace'},
    {value: 'LongHairShavedSides', label: 'LongHairShavedSides'},
    {value: 'LongHairStraight', label: 'LongHairStraight'},
    {value: 'LongHairStraight2', label: 'LongHairStraight2'},
    {value: 'LongHairStraightStrand', label: 'LongHairStraightStrand'},
    {value: 'ShortHairDreads01', label: 'ShortHairDreads01'},
    {value: 'ShortHairDreads02', label: 'ShortHairDreads02'},
    {value: 'ShortHairFrizzle', label: 'ShortHairFrizzle'},
    {value: 'ShortHairShaggyMullet', label: 'ShortHairShaggyMullet'},
    {value: 'ShortHairShortCurly', label: 'ShortHairShortCurly'},
    {value: 'ShortHairShortFlat', label: 'ShortHairShortFlat'},
    {value: 'ShortHairShortRound', label: 'ShortHairShortRound'},
    {value: 'ShortHairShortWaved', label: 'ShortHairShortWaved'},
    {value: 'ShortHairSides', label: 'ShortHairSides'},
    {value: 'ShortHairTheCaesar', label: 'ShortHairTheCaesar'},
    {value: 'ShortHairTheCaesarSidePart', label: 'ShortHairTheCaesarSidePart'},
    {value: 'WinterHat1', label: 'WinterHat1'},
    {value: 'WinterHat2', label: 'WinterHat2'},
    {value: 'WinterHat3', label: 'WinterHat3'},
    {value: 'WinterHat4', label: 'WinterHat4'},
  ];

  const eyeOptions = [
    {value: 'Close', label: 'Закрытые'},
    {value: 'Cry', label: 'Слеза'},
    {value: 'Dizzy', label: 'Dizzy'},
    {value: 'EyeRoll', label: 'EyeRoll'},
    {value: 'Happy', label: 'Happy'},
    {value: 'Hearts', label: 'Hearts'},
    {value: 'Side', label: 'Side'},
    {value: 'Squint', label: 'Squint'},
    {value: 'Surprised', label: 'Surprised'},
    {value: 'Wink', label: 'Wink'},
    {value: 'WinkWacky', label: 'WinkWacky'},
  ];

  const eyebrowOptions = [
    {value: 'Angry', label: 'Злые'},
    {value: 'AngryNatural', label: 'Злые натуральные'},
    {value: 'DefaultNatural', label: 'DefaultNatural'},
    {value: 'FlatNatural', label: 'FlatNatural'},
    {value: 'FrownNatural', label: 'FrownNatural'},
    {value: 'RaisedExcited', label: 'RaisedExcited'},
    {value: 'RaisedExcitedNatural', label: 'RaisedExcitedNatural'},
    {value: 'SadConcerned', label: 'SadConcerned'},
    {value: 'SadConcernedNatural', label: 'SadConcernedNatural'},
    {value: 'UnibrowNatural', label: 'UnibrowNatural'},
    {value: 'UpDown', label: 'UpDown'},
    {value: 'UpDownNatural', label: 'UpDownNatural'},
  ];

  const mouthOptions = [
    {value: 'Concerned', label: 'Обеспокоенный'},
    {value: 'Disbelief', label: 'Недоверчивый'},
    {value: 'Eating', label: 'Eating'},
    {value: 'Grimace', label: 'Grimace'},
    {value: 'Sad', label: 'Sad'},
    {value: 'ScreamOpen', label: 'ScreamOpen'},
    {value: 'Serious', label: 'Serious'},
    {value: 'Smile', label: 'Smile'},
    {value: 'Tongue', label: 'Tongue'},
    {value: 'Twinkle', label: 'Twinkle'},
    {value: 'Vomit', label: 'Vomit'},
  ];

  const facialHairTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'BeardMedium', label: 'Борода средняя'},
    {value: 'BeardLight', label: 'BeardLight'},
    {value: 'BeardMajestic', label: 'BeardMajestic'},
    {value: 'MoustacheFancy', label: 'MoustacheFancy'},
    {value: 'MoustacheMagnum', label: 'MoustacheMagnum'},
  ];

  const facialHairColorOptions = [
    {value: 'Auburn', label: 'Каштановый'},
    {value: 'Black', label: 'Черный'},
    {value: 'Blonde', label: 'Блонди'},
    {value: 'BlondeGolden', label: 'BlondeGolden'},
    {value: 'Brown', label: 'Brown'},
    {value: 'BrownDark', label: 'BrownDark'},
    {value: 'Platinum', label: 'Platinum'},
    {value: 'Red', label: 'Red'},
  ];

  const hairColorOptions = [
    {value: 'Auburn', label: 'Каштановый'},
    {value: 'Black', label: 'Черный'},
    {value: 'Blonde', label: 'Блонди'},
    {value: 'BlondeGolden', label: 'BlondeGolden'},
    {value: 'Brown', label: 'Brown'},
    {value: 'BrownDark', label: 'BrownDark'},
    {value: 'PastelPink', label: 'PastelPink'},
    {value: 'Red', label: 'Red'},
    {value: 'Blue', label: 'Blue'},
    {value: 'Platinum', label: 'Platinum'},
    {value: 'SilverGray', label: 'SilverGray'},
  ];

  const hatColorOptions = [
    {value: 'Black', label: 'Черный'},
    {value: 'Blue01', label: 'Черный 1'},
    {value: 'Blue02', label: 'Черный 2'},
    {value: 'Blue03', label: 'Черный 3'},
    {value: 'Gray01', label: 'Gray01'},
    {value: 'Gray02', label: 'Gray02'},
    {value: 'Heather', label: 'Heather'},
    {value: 'PastelBlue', label: 'PastelBlue'},
    {value: 'PastelGreen', label: 'PastelGreen'},
    {value: 'PastelOrange', label: 'PastelOrange'},
    {value: 'PastelRed', label: 'PastelRed'},
    {value: 'PastelYellow', label: 'PastelYellow'},
    {value: 'Pink', label: 'Pink'},
    {value: 'Red', label: 'Red'},
    {value: 'White', label: 'White'},
  ];

  const skinColorOptions = [
    {value: 'Tanned', label: 'Загорелый'},
    {value: 'Yellow', label: 'Желтый'},
    {value: 'Pale', label: 'Бледный'},
    {value: 'Light', label: 'Light'},
    {value: 'Brown', label: 'Brown'},
    {value: 'DarkBrown', label: 'DarkBrown'},
    {value: 'Black', label: 'Black'},
  ];

  const clotheColorOptions = [
    {value: 'Black', label: 'Черный'},
    {value: 'Blue01', label: 'Черный 1'},
    {value: 'Blue02', label: 'Черный 2'},
    {value: 'Blue03', label: 'Черный 3'},
    {value: 'Gray01', label: 'Gray01'},
    {value: 'Gray02', label: 'Gray02'},
    {value: 'Heather', label: 'Heather'},
    {value: 'PastelBlue', label: 'PastelBlue'},
    {value: 'PastelGreen', label: 'PastelGreen'},
    {value: 'PastelOrange', label: 'PastelOrange'},
    {value: 'PastelRed', label: 'PastelRed'},
    {value: 'PastelYellow', label: 'PastelYellow'},
    {value: 'Pink', label: 'Pink'},
    {value: 'Red', label: 'Red'},
    {value: 'White', label: 'White'},
  ];

  const clotheTypeOptions = [
    {value: 'BlazerShirt', label: 'Блейзер'},
    {value: 'BlazerSweater', label: 'Блейзер-свитер'},
    {value: 'CollarSweater', label: 'CollarSweater'},
    {value: 'SkullOutline', label: 'SkullOutline'},
    {value: 'Hoodie', label: 'Hoodie'},
    {value: 'Overall', label: 'Overall'},
    {value: 'ShirtCrewNeck', label: 'ShirtCrewNeck'},
    {value: 'ShirtScoopNeck', label: 'ShirtScoopNeck'},
    {value: 'ShirtVNeck', label: 'ShirtVNeck'},
  ];

  const accessoriesTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'Kurt', label: 'Курт'},
    {value: 'Prescription01', label: 'Prescription01'},
    {value: 'Prescription02', label: 'Prescription02'},
    {value: 'Round', label: 'Round'},
    {value: 'Sunglasses', label: 'Sunglasses'},
    {value: 'Wayfarers', label: 'Wayfarers'},
  ];

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
    console.log(options);
    setAvatarSelectOptions(options);
  }

  useEffect(() => {
    const {user} = meData.me;
    if (user) {
      // if(!user.avatar) {
      //   randomChangedHandler({topType: 'Hijab', eyeType: 'Happy' })
      // }
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
        {
          avatarDisplayOptions && <AvatarComponent
              className="mx-auto max-w-lg"
              avatarStyle='Circle'
              random={true}
              customizable={true}
              onRandomChanged={randomChangedHandler}
              {...avatarDisplayOptions}
          />
        }
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
