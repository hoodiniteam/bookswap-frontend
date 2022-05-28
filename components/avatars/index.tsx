import * as React from 'react'

import {Avatar, AvatarStyle} from './avatar'
import { allOptions } from './options'

import { useContext, useEffect, useState } from 'react';
import OptionContext from "./options/OptionContext";
import { sample } from 'lodash';
import Button from '../Button';
import {useRouter} from "next/router";

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
  random?: boolean
  onRandomChanged?: (values: any) => void
  customizable?: boolean
}
export const MyOptionContext = React.createContext(new OptionContext(allOptions));

export const AvatarComponent = (props: Props) => {
  const { avatarStyle, style, className } = props;
  const [context] = useState(new OptionContext(allOptions));

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
    console.log("random");
    const values: { [index: string]: string } = {
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
    if (props.onRandomChanged) {
      props.onRandomChanged(values);
    }
  }

  useEffect(() => {
    updateOptionContext(props);
  }, [props])

  return (
      <MyOptionContext.Provider value={context}>
          <Avatar {...props} avatarStyle={avatarStyle as AvatarStyle} style={style} className={className} />
          {
            props.random && <div className="flex justify-center p-6">
                <Button
                    variant='secondary'
                    onClick={onRandom}
                >
                    Рандомно
                </Button>
            </div>
          }
      </MyOptionContext.Provider>
  )
}
