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
    {value: 'NoHair', label: t('no-hair')},
    {value: 'Hat', label: t('hat')},
    {value: 'Hijab', label: t('hijab')},
    {value: 'Eyepatch', label: t('eyepatch')},
    {value: 'LongHairBigHair', label: t('long-hair-big-hair')},
    {value: 'LongHairBob', label: t('long-hair-bob') },
    {value: 'LongHairBun', label: t('long-hair-bun')},
    {value: 'LongHairCurly', label: t('long-hair-curly')},
    {value: 'LongHairCurvy', label: t('long-hair-curvy')},
    {value: 'LongHairDreads', label: t('long-hair-dreads')},
    {value: 'LongHairFrida', label: t('long-hair-frida')},
    {value: 'LongHairFro', label: t('long-hair-fro')},
    {value: 'LongHairFroBand', label: t('long-hair-fro-band')},
    {value: 'LongHairMiaWallace', label: t('long-hair-mia-wallace')},
    {value: 'LongHairShavedSides', label: t('long-hair-shaved-sides')},
    {value: 'LongHairStraight', label: t('long-hair-straight')},
    {value: 'LongHairStraight2', label: t('long-hair-straight2')},
    {value: 'LongHairStraightStrand', label: t('long-hair-straight-strand')},
    {value: 'ShortHairDreads01', label: t('short-hair-dreads01')},
    {value: 'ShortHairDreads02', label: t('short-hair-dreads02')},
    {value: 'ShortHairFrizzle', label: t('short-hair-frizzle')},
    {value: 'ShortHairShaggyMullet', label: t('short-hair-shaggy-mullet')},
    {value: 'ShortHairShortCurly', label: t('short-hair-short-curly')},
    {value: 'ShortHairShortFlat', label: t('short-hair-short-flat')},
    {value: 'ShortHairShortRound', label: t('short-hair-short-round')},
    {value: 'ShortHairShortWaved', label: t('short-hair-short-waved')},
    {value: 'ShortHairSides', label: t('short-hair-sides')},
    {value: 'ShortHairTheCaesar', label: t('short-hair-the-caesar')},
    {value: 'ShortHairTheCaesarSidePart', label: t('short-hair-the-caesar-side-part')},
    {value: 'WinterHat1', label: t('winter-hat1')},
    {value: 'WinterHat2', label: t('winter-hat2')},
    {value: 'WinterHat3', label: t('winter-hat3')},
    {value: 'WinterHat4', label: t('winter-hat4')},
  ];

  const eyeOptions = [
    {value: 'Close', label: t('close')},
    {value: 'Cry', label: t('cry')},
    {value: 'Dizzy', label: t('dizzy')},
    {value: 'EyeRoll', label: t('eyeRoll')},
    {value: 'Happy', label: t('happy')},
    {value: 'Hearts', label: t('hearts')},
    {value: 'Side', label: t('side')},
    {value: 'Squint', label: t('squint')},
    {value: 'Surprised', label: t('surprised')},
    {value: 'Wink', label: t('wink')},
    {value: 'WinkWacky', label: t('wink-wacky')},
  ];

  const eyebrowOptions = [
    {value: 'Angry', label: t('angry')},
    {value: 'AngryNatural', label: t('angry-natural')},
    {value: 'DefaultNatural', label: t('default-natural')},
    {value: 'FlatNatural', label: t('flat-natural')},
    {value: 'FrownNatural', label: t('frown-natural')},
    {value: 'RaisedExcited', label: t('raised-excited')},
    {value: 'RaisedExcitedNatural', label: t('raised-excited-natural')},
    {value: 'SadConcerned', label: t('sad-concerned')},
    {value: 'SadConcernedNatural', label: t('sad-concerned-natural')},
    {value: 'UnibrowNatural', label: t('unibrow-natural')},
    {value: 'UpDown', label: t('up-down')},
    {value: 'UpDownNatural', label: t('up-down-natural')},
  ];

  const mouthOptions = [
    {value: 'Concerned', label: t('concerned')},
    {value: 'Disbelief', label: t('disbelief')},
    {value: 'Eating', label: t('eating')},
    {value: 'Grimace', label: t('grimace')},
    {value: 'Sad', label: t('sad')},
    {value: 'ScreamOpen', label: t('scream-open')},
    {value: 'Serious', label: t('serious')},
    {value: 'Smile', label: t('smile')},
    {value: 'Tongue', label: t('tongue')},
    {value: 'Twinkle', label: t('twinkle')},
    {value: 'Vomit', label: t('vomit')},
  ];

  const facialHairTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'BeardMedium', label: t('beard-medium')},
    {value: 'BeardLight', label: t('beard-light')},
    {value: 'BeardMajestic', label: t('beard-majestic')},
    {value: 'MoustacheFancy', label: t('moustache-fancy')},
    {value: 'MoustacheMagnum', label: t('moustache-magnum')},
  ];

  const facialHairColorOptions = [
    {value: 'Auburn', label: t('auburn')},
    {value: 'Black', label: t('black')},
    {value: 'Blonde', label: t('blonde')},
    {value: 'BlondeGolden', label: t('blonde-golden')},
    {value: 'Brown', label: t('brown')},
    {value: 'BrownDark', label: t('dark-brown')},
    {value: 'Platinum', label: t('platinum')},
    {value: 'Red', label: t('red')},
  ];

  const hairColorOptions = [
    {value: 'Auburn', label: t('auburn')},
    {value: 'Black', label: t('black')},
    {value: 'Blonde', label: t('blonde')},
    {value: 'BlondeGolden', label: t('blonde-golden')},
    {value: 'Brown', label: t('brown')},
    {value: 'BrownDark', label: t('dark-brown')},
    {value: 'PastelPink', label: t('platinum')},
    {value: 'Red', label: t('angry')},
    {value: 'Blue', label: t('red')},
    {value: 'Platinum', label: t('platinum')},
    {value: 'SilverGray', label: t('silver-gray')},
  ];

  const hatColorOptions = [
    {value: 'Black', label: t('black')},
    {value: 'Blue01', label: t('blue')},
    {value: 'Blue02', label: t('blue2')},
    {value: 'Blue03', label: t('blue3')},
    {value: 'Gray01', label: t('gray')},
    {value: 'Gray02', label: t('gray2')},
    {value: 'Heather', label: t('heather')},
    {value: 'PastelBlue', label: t('pastel-blue')},
    {value: 'PastelGreen', label: t('pastel-green')},
    {value: 'PastelOrange', label: t('pastel-orange')},
    {value: 'PastelRed', label: t('pastel-red')},
    {value: 'PastelYellow', label: t('pastel-yellow')},
    {value: 'Pink', label: t('pink')},
    {value: 'Red', label: t('red')},
    {value: 'White', label: t('white')},
  ];

  const skinColorOptions = [
    {value: 'Tanned', label: t('tanned')},
    {value: 'Yellow', label: t('yellow')},
    {value: 'Pale', label: t('pale')},
    {value: 'Light', label: t('light')},
    {value: 'Brown', label: t('brown')},
    {value: 'DarkBrown', label: t('dark-brown')},
    {value: 'Black', label: t('black')},
  ];

  const clotheColorOptions = [
    {value: 'Black', label: t('black')},
    {value: 'Blue01', label: t('blue')},
    {value: 'Blue02', label: t('blue2')},
    {value: 'Blue03', label: t('blue3')},
    {value: 'Gray01', label: t('gray')},
    {value: 'Gray02', label: t('gray2')},
    {value: 'Heather', label: t('heather')},
    {value: 'PastelBlue', label: t('pastel-blue')},
    {value: 'PastelGreen', label: t('pastel-green')},
    {value: 'PastelOrange', label: t('pastel-orange')},
    {value: 'PastelRed', label: t('pastel-red')},
    {value: 'PastelYellow', label: t('pastel-yellow')},
    {value: 'Pink', label: t('pink')},
    {value: 'Red', label: t('red')},
    {value: 'White', label: t('white')},
  ];

  const clotheTypeOptions = [
    {value: 'BlazerShirt', label: t('blazer-shirt')},
    {value: 'BlazerSweater', label: t('blazer-sweater')},
    {value: 'CollarSweater', label: t('collar-sweater')},
    {value: 'SkullOutline', label: t('skull-outlin')},
    {value: 'Hoodie', label: t('hoodie')},
    {value: 'Overall', label: t('overall')},
    {value: 'ShirtCrewNeck', label: t('shirt-crew-neck')},
    {value: 'ShirtScoopNeck', label: t('shirt-scoop-neck')},
    {value: 'ShirtVNeck', label: t('shirt-v-neck')},
  ];

  const accessoriesTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'Kurt', label: t('kurt')},
    {value: 'Prescription01', label: t('prescription1')},
    {value: 'Prescription02', label: t('prescription2')},
    {value: 'Round', label: t('round')},
    {value: 'Sunglasses', label: t('sunglasses')},
    {value: 'Wayfarers', label: t('wayfarers')},
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
