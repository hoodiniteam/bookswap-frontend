import * as React from 'react'

import {Avatar, AvatarStyle} from './avatar'
import { allOptions } from './options'

import {useContext, useEffect} from "react";
import OptionContext from "./options/OptionContext";
import { sample } from 'lodash';

export interface Props {
  avatarStyle: string
  className?: string;
  style?: React.CSSProperties
  topType?: string
  accessoriesType?: string
  hairColor?: string
  facialHairType?: string
  facialHairColor?: string
  clotheType?: string
  clotheColor?: string
  graphicType?: string
  eyeType?: string
  eyebrowType?: string
  mouthType?: string
  skinColor?: string
  pieceType?:string
  pieceSize?:string
  viewBox?:string
}
export const MyOptionContext = React.createContext(new OptionContext(allOptions));

export const AvatarComponent = (props: Props) => {
  const { avatarStyle, style, className } = props;
  const context = useContext(MyOptionContext);

  const getContext = () => {
    return { context }
  }

  const updateOptionContext = (props: any) => {
    const data: { [index: string]: string } = {}
    for (const option of allOptions) {
      const value = props[option.key]
      if (!value) {
        continue
      }
      data[option.key] = value
    }
    context.setData(data);
  }

  const onRandom = () => {
    let values: { [index: string]: string } = {
      avatarStyle,
    }

    for (const option of context.options) {
      if (option.key in values) {
        continue
      }
      const optionState = context.getOptionState(option.key)!
      // Notice, when the app just launch and we didn't explore too much
      // options, some of these nested option is not added by the selector
      // yet, so we won't be able to select value for them. But as they
      // keep tapping random button, soon or later we will get all the
      // options. So it should be fine. Ideally we should find a better
      // way to collect all the options, but that's okay to just do it this
      // way for now.
      if (!optionState.options.length) {
        continue
      }
      values[option.key] = sample(optionState.options)!
    }
    context.setData(values);
  }

  useEffect(() => {
    updateOptionContext(props);
    onRandom();
  }, [props])

  return (
      <div>
        <Avatar avatarStyle={avatarStyle as AvatarStyle} style={style} className={className} />
        <button
            type="button"
            onClick={onRandom}
            className="bg-main-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
        >
          Random
        </button>
      </div>
  )
}