import { useTranslation } from 'next-i18next';
import { localesList } from './locales';
import { UserAvatar } from '../generated/graphql';

export const useAvatarOptions = () => {
  const { t } = useTranslation(localesList);
  const hairOptions = [
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
    {value: "", label: "-"},
    {value: 'Blank', label: '-'},
    {value: 'BeardMedium', label: t('beard-medium')},
    {value: 'BeardLight', label: t('beard-light')},
    {value: 'BeardMajestic', label: t('beard-majestic')},
    {value: 'MoustacheFancy', label: t('moustache-fancy')},
    {value: 'MoustacheMagnum', label: t('moustache-magnum')},
  ];
  const facialHairColorOptions = [
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
    {value: "", label: "-"},
    {value: 'Tanned', label: t('tanned')},
    {value: 'Yellow', label: t('yellow')},
    {value: 'Pale', label: t('pale')},
    {value: 'Light', label: t('light')},
    {value: 'Brown', label: t('brown')},
    {value: 'DarkBrown', label: t('dark-brown')},
    {value: 'Black', label: t('black')},
  ];
  const clotheColorOptions = [
    {value: "", label: "-"},
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
    {value: "", label: "-"},
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
  const graphicTypeOptions = [
    {value: "", label: "-"},
    {value: 'Bat', label: t('bat')},
    {value: 'Cumbia', label: t('cumbia')},
    {value: 'Deer', label: t('deer')},
    {value: 'Diamond', label: t('diamond')},
    {value: 'Hola', label: t('hola')},
    {value: 'Pizza', label: t('pizza')},
    {value: 'Resist', label: t('resist')},
    {value: 'Selena', label: t('selena')},
    {value: 'Bear', label: t('bear')},
    {value: 'SkullOutline', label: t('skull-outline')},
    {value: 'Skull', label: t('skull')},
  ]
  const avatarSelectList = [{
    label: "Волосы и Головные уборы",
    value: "topType",
    options: hairOptions,
  }, {
    label: "Глаза",
    value: "eyeType",
    options: eyeOptions,
  }, {
    label: "Брови",
    value: "eyebrowType",
    options: eyebrowOptions,
  }, {
    label: "Рот",
    value: "mouthType",
    options: mouthOptions,
  },{
    label: "Волосы на лице",
    value: "facialHairType",
    options: facialHairTypeOptions,
  }, {
    label: "Цвет волос на лице",
    value: "facialHairColor",
    options: facialHairColorOptions,
  },{
    label: "Цвет волос на голове",
    value: "hairColor",
    options: hairColorOptions,
  },{
    label: "Цвет головного убора",
    value: "hatColor",
    options: hatColorOptions,
  },{
    label: "Цвет кожи",
    value: "skinColor",
    options: skinColorOptions,
  },{
    label: "Цвет одежды",
    value: "clotheColor",
    options: clotheColorOptions,
  },{
    label: "Тип одежды",
    value: "clotheType",
    options: clotheTypeOptions,
  },{
    label: "Тип аксессуаров",
    value: "accessoriesType",
    options: accessoriesTypeOptions,
  }, {
    label: "Тип графики",
    value: "graphicType",
    options: graphicTypeOptions,
  }];
  const avatarOptionsSetter = (values: Partial<UserAvatar>, setterFn: React.Dispatch<any>) => {
    const topType = hairOptions.find(
      (option) => option.value === values['topType']
    );
    const eyeType = eyeOptions.find(
      (option) => option.value === values['eyeType']
    );
    const eyebrowType = eyebrowOptions.find(
      (option) => option.value === values['eyebrowType']
    );
    const mouthType = mouthOptions.find(
      (option) => option.value === values['mouthType']
    );
    const facialHairType = facialHairTypeOptions.find(
      (option) => option.value === values['facialHairType']
    );
    const facialHairColor = facialHairColorOptions.find(
      (option) => option.value === values['facialHairColor']
    );
    const hairColor = hairColorOptions.find(
      (option) => option.value === values['hairColor']
    );
    const hatColor = hatColorOptions.find(
      (option) => option.value === values['hatColor']
    );
    const skinColor = skinColorOptions.find(
      (option) => option.value === values['skinColor']
    );
    const clotheColor = clotheColorOptions.find(
      (option) => option.value === values['clotheColor']
    );
    const clotheType = clotheTypeOptions.find(
      (option) => option.value === values['clotheType']
    );
    const accessoriesType = accessoriesTypeOptions.find(
      (option) => option.value === values['accessoriesType']
    );
    const graphicType = graphicTypeOptions.find(
      (option) => option.value === values['graphicType']
    );
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
      graphicType,
    };
    setterFn(options);
  }
  return {
    hairOptions,
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
    accessoriesTypeOptions,
    graphicTypeOptions,
    avatarSelectList,
    avatarOptionsSetter,
  }
}
