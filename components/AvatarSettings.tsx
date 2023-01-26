import { useRouter } from 'next/router';
import { useQueryWrapper } from '@/helpers/useQueryWrapper';
import {
  CreateUserAvatar,
  GetMeQuery,
  MutationCreateOneUserAvatarArgs,
  MutationUpdateOneUserAvatarArgs, UpdateUserAvatar,
} from '@/gtypes';
import { useAvatarOptions } from '@/helpers/avatarOptions';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'urql';
import { loader } from 'graphql.macro';
import { AvatarComponent } from './avatars';
import Select from 'react-select';
import Button from './Button';
const GetMe = loader('../graphql/GetMe.graphql');

export const AvatarSettings = ({nextButtonTitle = "Cохранить", showSkip = false}) => {
  const Router = useRouter();
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
    MutationCreateOneUserAvatarArgs
  >(CreateUserAvatar);
  const [, updateAvatar] = useMutation<
    MutationUpdateOneUserAvatarArgs
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
      }).then(async () => {
        await Router.push('/home');
      });
    } else {
      await createAvatar({...baseOptions, ...avatarDisplayOptions}).then(async () => {
        await Router.push('/home');
      });
    }
  };

  const skipHandler = async () => {
    await Router.push('/home');
  };

  useEffect(() => {
    const user = meData?.me?.user;
    if (user) {
      setAvatarDisplayOptions(user.avatar);
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
    return <div className="bg-white py-4 px-6 border rounded-md md:grid lg:grid-cols-2 items-center gap-4">
      <div>
        <AvatarComponent
          className="mx-auto max-w-md"
          avatarStyle="Circle"
          random={true}
          customizable={true}
          onRandomChanged={randomChangedHandler}
          {...avatarDisplayOptions}
        />
      </div>
      <div className="space-y-8">
        <div className="avatar-selectors overflow-auto sm:overflow-visible grid gap-x-6 gap-y-4 sm:grid-cols-2">
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
        <div className="flex space-x-4 justify-end">
          {
            showSkip && <Button onClick={skipHandler} variant="primaryOutline">
              Пока пропустить
            </Button>
          }
          <Button onClick={saveAvatarHandler}>{nextButtonTitle}</Button>
        </div>
      </div>
    </div>
  }

  return null
}
