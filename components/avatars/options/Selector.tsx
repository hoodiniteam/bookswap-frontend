import * as React from 'react'

import Option from './Option'
import {ReactElement, useContext, useEffect, useState} from "react";
import OptionContext from "./OptionContext";
import {MyOptionContext} from "../index";

function getComponentOptionValue (component: React.ComponentClass) {
  const optionValue = (component as any).optionValue
  if (!optionValue) {
    throw new Error(`optionValue should be provided for ${component}`)
  }
  return optionValue
}

export interface Props {
  children: ReactElement[] | ReactElement
  option: Option
  defaultOption: React.ComponentClass | string
}

export const Selector = ({option, defaultOption, children}:Props) => {
  const [,update] = useState(0);
  const context = useContext(MyOptionContext);

  const optionContextUpdate = () => {
    update(Math.random());
  }

  const updateOptionValues = (
      nextProps?: Props & { children?: React.ReactNode }
  ) => {
    if (nextProps && children === nextProps.children) {
      return
    }
    const values = React.Children.map(
        children,
        // TODO: also validate and throw error if we don't see optionValue
        child => getComponentOptionValue((child as any).type)
    )
    if (new Set(values).size !== values?.length) {
      throw new Error('Duplicate values')
    }
    context.setOptions(option.key, values)
  }

  useEffect(() => {
    const defaultValue = (
        typeof defaultOption === 'string' ?
            defaultOption : getComponentOptionValue(defaultOption)
    )
    context.addStateChangeListener(optionContextUpdate);
    context.optionEnter(option.key);
    const optionState = context.getOptionState(option.key);
    updateOptionValues();
    if (optionState) {
      context.setDefaultValue(option.key, defaultValue)
    }
    return () => {
      context.removeStateChangeListener(optionContextUpdate)
      context.optionExit(option.key)
    }
  }, []);

  let result: React.ReactNode | null = null;
  const value = context.getValue(option.key)!
  React.Children.forEach(children, child => {
    if (getComponentOptionValue((child as any).type) === value) {
      result = child
    }
  })

  return result;
}

/* export default class Selector extends React.Component<Props> {
  static contextTypes = {
    optionContext: PropTypes.instanceOf(OptionContext)
  }

  private get optionContext (): OptionContext {
    return this.context.optionContext
  }

  UNSAFE_componentWillMount () {
    const { option, defaultOption } = this.props
    const { optionContext } = this
    const defaultValue = (
      typeof defaultOption === 'string' ?
      defaultOption : getComponentOptionValue(defaultOption)
    )
    optionContext.addStateChangeListener(this.optionContextUpdate)
    optionContext.optionEnter(option.key)
    const optionState = optionContext.getOptionState(option.key)
    this.updateOptionValues()
    if (optionState) {
      optionContext.setDefaultValue(option.key, defaultValue)
    }
  }

  UNSAFE_componentWillUpdate (nextProps: Props & { children?: React.ReactNode }) {
    this.updateOptionValues(nextProps)
  }

  componentWillUnmount () {
    this.optionContext.removeStateChangeListener(this.optionContextUpdate)
    this.optionContext.optionExit(this.props.option.key)
  }

  render () {
    let result: React.ReactNode | null = null
    const { option, children } = this.props
    const value = this.optionContext.getValue(option.key)!
    React.Children.forEach(children, child => {
      if (getComponentOptionValue((child as any).type) === value) {
        result = child
      }
    })
    return result
  }

  private optionContextUpdate = () => {
    this.forceUpdate()
  }

  private updateOptionValues (
    nextProps?: Props & { children?: React.ReactNode }
  ) {
    if (nextProps && this.props.children === nextProps.children) {
      return
    }
    const { option, children } = this.props
    const values = React.Children.map(
      children,
      // TODO: also validate and throw error if we don't see optionValue
      child => getComponentOptionValue((child as any).type)
    )
    if (new Set(values).size !== values?.length) {
      throw new Error('Duplicate values')
    }
    this.optionContext.setOptions(option.key, values)
  }
} */
