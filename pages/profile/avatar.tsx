import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import { AvatarComponent } from '../../components/avatars';
import Select from 'react-select';
import Button from '../../components/Button';
import { useMutation } from 'urql';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { useAvatarOptions } from '../../helpers/avatarOptions';
import { loader } from 'graphql.macro';
import {
  GetMeQuery, MutationCreateUserAvatarArgs, MutationUpdateUserAvatarArgs,
} from '../../generated/graphql.d';
const GetMe = loader('../../graphql/GetMe.graphql');
const CreateUserAvatar = loader('../../graphql/CreateAvatarMutation.graphql');
const UpdateUserAvatar = loader('../../graphql/UpdateAvatarMutation.graphql');

const Avatar = () => {
  const [{ data: meData, fetching }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });
  const {
    avatarSelectList,
    avatarOptionsSetter,
  } = useAvatarOptions();
  const [avatarSelectOptions, setAvatarSelectOptions] = useState<any>({});
  const [avatarDisplayOptions, setAvatarDisplayOptions] = useState<any>(null);
  const [, createAvatar] = useMutation<
    MutationCreateUserAvatarArgs
  >(CreateUserAvatar);
  const [, updateAvatar] = useMutation<
    MutationUpdateUserAvatarArgs
  >(UpdateUserAvatar);

  const baseOptions = {
    avatarStyle: 'Circle',
    accessoriesType: null,
    clotheType: null,
    clotheColor: null,
    eyeType: null,
    eyebrowType: null,
    facialHairType: null,
    facialHairColor: null,
    hairColor: null,
    hatColor: null,
    mouthType: null,
    skinColor: null,
    topType: null,
    graphicType: null,
  }
  const saveAvatarHandler = async () => {
    console.log(avatarDisplayOptions);
    if (meData?.me?.user?.avatarId) {
      await updateAvatar({
        id: meData.me.user.avatarId, ...{...baseOptions, ...avatarDisplayOptions},
      });
    } else {
      await createAvatar({...baseOptions, ...avatarDisplayOptions});
    }
  };

  useEffect(() => {
    const { user } = meData?.me || {};
    if (user) {
      setAvatarDisplayOptions(user.avatar || {});
      avatarOptionsSetter(user.avatar || {}, setAvatarSelectOptions);
    }
  }, [meData]);

  const handleOptionChange = ({ value, label }: any, { name }: any) => {
    setAvatarDisplayOptions({ ...(avatarDisplayOptions || {}), [name]: value });
    setAvatarSelectOptions({
      ...avatarSelectOptions,
      [name]: { value, label },
    });
  };

  const randomChangedHandler = (values: any) => {
    setAvatarDisplayOptions(values);
    avatarOptionsSetter(values, setAvatarSelectOptions);
  };

  if (fetching) return <p>Loading...</p>;

  if (meData?.me) {
    return (
      <div>
        <AvatarComponent
          className="mx-auto sticky sm:relative z-10 top-2 bg-white rounded-md max-w-[450px] shadow-md pb-4"
          avatarStyle="Circle"
          random={true}
          customizable={true}
          onRandomChanged={randomChangedHandler}
          {...avatarDisplayOptions}
        />
        <div className="avatar-selectors overflow-auto sm:overflow-visible grid gap-4 pt-4 sm:grid-cols-3">
          {
            avatarSelectList.map((item) => {
              return (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700">
                    {item.label}
                  </label>
                  <Select
                    placeholder={item.label}
                    classNamePrefix="select"
                    isSearchable
                    menuPlacement={'auto'}
                    value={avatarSelectOptions[item.value]}
                    name={item.value}
                    options={item.options}
                    onChange={handleOptionChange}
                  />
                </div>
              );
            })
          }
        </div>
        <div className="flex mt-4 justify-end">
          <Button onClick={saveAvatarHandler}>Сохранить</Button>
        </div>
      </div>
    );
  }
  return null;
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
