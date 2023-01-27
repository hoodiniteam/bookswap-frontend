import { UserAvatar } from '@/gtypes';

export const useAvatarOptions = () => {
  const hairOptions = [
    {value: "", label: "-"},
    {value: 'NoHair', label: "Без волос"},
    {value: 'Hat', label: "Шляпа"},
    {value: 'Hijab', label: "Хиджаб"},
    {value: 'Eyepatch', label: "Патч на глаз"},
    {value: 'LongHairBigHair', label: "Длинные густые"},
    {value: 'LongHairBob', label: "Длинные Боб"},
    {value: 'LongHairBun', label: "Длинные Бан"},
    {value: 'LongHairCurly', label: "Длинные кудрявые"},
    {value: 'LongHairCurvy', label: "Длинные пышные"},
    {value: 'LongHairDreads', label: "Длинные Дреды"},
    {value: 'LongHairFrida', label: "Длинные Волосы в стиле Фрида"},
    {value: 'LongHairFro', label: "Длинные Афро"},
    {value: 'LongHairFroBand', label: "Зачесанны за обруч"},
    {value: 'LongHairMiaWallace', label: "Миа Валас"},
    {value: 'LongHairShavedSides', label: "Длинные Волосы с Выбритыми Боками"},
    {value: 'LongHairStraight', label: "Длинные Прямые1"},
    {value: 'LongHairStraight2', label: "Длинные Прямые2"},
    {value: 'LongHairStraightStrand', label: "Длинные Прямые"},
    {value: 'ShortHairDreads01', label: "Короткие Дреды1"},
    {value: 'ShortHairDreads02', label: "Короткие Дреды2"},
    {value: 'ShortHairFrizzle', label: "Короткие Завитые Волосы"},
    {value: 'ShortHairShaggyMullet', label: "Короткие Шэгги"},
    {value: 'ShortHairShortCurly', label: "Короткие Кудрявые"},
    {value: 'ShortHairShortFlat', label: "Короткие Уложенные"},
    {value: 'ShortHairShortRound', label: "Короткие"},
    {value: 'ShortHairShortWaved', label: "Короткие Волнистые"},
    {value: 'ShortHairSides', label: "Короткие Сбоку"},
    {value: 'ShortHairTheCaesar', label: "Короткие Кезарь"},
    {value: 'ShortHairTheCaesarSidePart', label: "Короткие Кезарь Сбоку"},
    {value: 'WinterHat1', label: "Зимняя Шапка1"},
    {value: 'WinterHat2', label: "Зимняя Шапка2"},
    {value: 'WinterHat3', label: "Зимняя Шапка3"},
    {value: 'WinterHat4', label: "Зимняя Шапка4"},
  ];
  const eyeOptions = [
    {value: "", label: "-"},
    {value: 'Close', label: "Закрытые"},
    {value: 'Cry', label: "Плачущие"},
    {value: 'Dizzy', label: "Ошеломленные"},
    {value: 'EyeRoll', label: "Крутящиеся"},
    {value: 'Happy', label: "Счастливые"},
    {value: 'Hearts', label: "Сердца"},
    {value: 'Side', label: "Сбоку"},
    {value: 'Squint', label: "Свернутые"},
    {value: 'Surprised', label: "Удивленные"},
    {value: 'Wink', label: "Подмигивающие"},
    {value: 'WinkWacky', label: "Подмигивающие2"},
  ];
  const eyebrowOptions = [
    {value: "", label: "-"},
    {value: 'Angry', label: "Злые"},
    {value: 'AngryNatural', label: "Злые Натуральные"},
    {value: 'DefaultNatural', label: "Натуральные"},
    {value: 'FlatNatural', label: "Плоские Натуральные"},
    {value: 'FrownNatural', label: "Натуральные Серьезные"},
    {value: 'RaisedExcited', label: "Поднятые Возбужденные"},
    {value: 'RaisedExcitedNatural', label: "Поднятые Возбужденные Натуральные"},
    {value: 'SadConcerned', label: "Грустные Заботливые"},
    {value: 'SadConcernedNatural', label: "Грустные Заботливые Натуральные"},
    {value: 'UnibrowNatural', label: "Универсальые Натуральные"},
    {value: 'UpDown', label: "Вверх-Вниз"},
    {value: 'UpDownNatural', label: "Вверх-Вниз Натуральные"},
  ];
  const mouthOptions = [
    {value: "", label: "-"},
    {value: 'Concerned', label: "Обеспокоенный"},
    {value: 'Disbelief', label: "Сомневающий"},
    {value: 'Eating', label: "Ест"},
    {value: 'Grimace', label: "Гримаса"},
    {value: 'Sad', label: "Грустный"},
    {value: 'ScreamOpen', label: "Крик"},
    {value: 'Serious', label: "Серьезный"},
    {value: 'Smile', label: "Улыбка"},
    {value: 'Tongue', label: "Язык"},
    {value: 'Twinkle', label: "Блестящий"},
    {value: 'Vomit', label: "Рвота"},
  ];
  const facialHairTypeOptions = [
    {value: "", label: "-"},
    {value: 'Blank', label: '-'},
    {value: 'BeardMedium', label: "Борода Средняя"},
    {value: 'BeardLight', label: "Борода Легкая"},
    {value: 'BeardMajestic', label: "Борода Величественная"},
    {value: 'MoustacheFancy', label: "Усы Фантазия"},
    {value: 'MoustacheMagnum', label: "Усы Магнум"},
  ];
  const facialHairColorOptions = [
    {value: "", label: "-"},
    {value: 'Auburn', label: "Рыжий"},
    {value: 'Black', label: "Черный"},
    {value: 'Blonde', label: "Блондин"},
    {value: 'BlondeGolden', label: "Блондин Золотистый"},
    {value: 'Brown', label: "Коричневый"},
    {value: 'BrownDark', label: "Коричневый Темный"},
    {value: 'Platinum', label: "Платиновый"},
    {value: 'Red', label: "Красный"},
  ];
  const hairColorOptions = [
    {value: "", label: "-"},
    {value: 'Auburn', label: "Рыжий"},
    {value: 'Black', label: "Черный"},
    {value: 'Blonde', label: "Блондин"},
    {value: 'BlondeGolden', label: "Блондин Золотистый"},
    {value: 'Brown', label: "Коричневый"},
    {value: 'BrownDark', label: "Коричневый Темный"},
    {value: 'PastelPink', label: "Розовый"},
    {value: 'Red', label: "Красный"},
    {value: 'Blue', label: "Синий"},
    {value: 'Platinum', label: "Платиновый"},
    {value: 'SilverGray', label: "Серебряный"},
  ];
  const hatColorOptions = [
    {value: "", label: "-"},
    {value: 'Black', label: "Черный"},
    {value: 'Blue01', label: "Синий 1"},
    {value: 'Blue02', label: "Синий 2"},
    {value: 'Blue03', label: "Синий 3"},
    {value: 'Gray01', label: "Серый 1"},
    {value: 'Gray02', label: "Серый 2"},
    {value: 'Heather', label: "Хитер"},
    {value: 'PastelBlue', label: "Голубой"},
    {value: 'PastelGreen', label: "Зеленый"},
    {value: 'PastelOrange', label: "Оранжевый"},
    {value: 'PastelRed', label: "Красный"},
    {value: 'PastelYellow', label: "Желтый"},
    {value: 'Pink', label: "Розовый"},
    {value: 'Red', label: "Красный"},
    {value: 'White', label: "Белый"},
  ];
  const skinColorOptions = [
    {value: "", label: "-"},
    {value: 'Tanned', label: "Загар"},
    {value: 'Yellow', label: "Желтый"},
    {value: 'Pale', label: "Бледный"},
    {value: 'Light', label: "Светлый"},
    {value: 'Brown', label: "Коричневый"},
    {value: 'DarkBrown', label: "Темный Коричневый"},
    {value: 'Black', label: "Черный"},
  ];
  const clotheColorOptions = [
    {value: "", label: "-"},
    {value: 'Black', label: "Черный"},
    {value: 'Blue01', label: "Синий 1"},
    {value: 'Blue02', label: "Синий 2"},
    {value: 'Blue03', label: "Синий 3"},
    {value: 'Gray01', label: "Серый 1"},
    {value: 'Gray02', label: "Серый 2"},
    {value: 'Heather', label: "Хитер"},
    {value: 'PastelBlue', label: "Голубой"},
    {value: 'PastelGreen', label: "Зеленый"},
    {value: 'PastelOrange', label: "Оранжевый"},
    {value: 'PastelRed', label: "Красный"},
    {value: 'PastelYellow', label: "Желтый"},
    {value: 'Pink', label: "Розовый"},
    {value: 'Red', label: "Красный"},
    {value: 'White', label: "Белый"},
  ];
  const clotheTypeOptions = [
    {value: "", label: "-"},
    {value: 'BlazerShirt', label: "Блейзер"},
    {value: 'BlazerSweater', label: "Блейзер Свитер"},
    {value: 'CollarSweater', label: "Свитер Свитер"},
    {value: 'SkullOutline', label: "Череп"},
    {value: 'Hoodie', label: "Худи"},
    {value: 'Overall', label: "Комбинезон"},
    {value: 'ShirtCrewNeck', label: "Футболка 1"},
    {value: 'ShirtScoopNeck', label: "Футболка 2"},
    {value: 'ShirtVNeck', label: "Футболка 3"},
  ];
  const accessoriesTypeOptions = [
    {value: 'Blank', label: '-'},
    {value: 'Kurt', label: "Курт"},
    {value: 'Prescription01', label: "Очки 1"},
    {value: 'Prescription02', label: "Очки 2"},
    {value: 'Round', label: "Округлые"},
    {value: 'Sunglasses', label: "Солнцезащитные очки"},
    {value: 'Wayfarers', label: "Очки"},
  ];
  const graphicTypeOptions = [
    {value: "", label: "-"},
    {value: 'Bat', label: "Летучая мышь"},
    {value: 'Cumbia', label: "Кумбия"},
    {value: 'Deer', label: "Олень"},
    {value: 'Diamond', label: "Бриллиант"},
    {value: 'Hola', label: "Привет"},
    {value: 'Pizza', label: "Пицца"},
    {value: 'Resist', label: "Сопротивление"},
    {value: 'Selena', label: "Селена"},
    {value: 'Bear', label: "Медведь"},
    {value: 'SkullOutline', label: "Череп 1"},
    {value: 'Skull', label: "Череп 2"},
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
