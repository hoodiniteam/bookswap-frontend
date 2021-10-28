import React, { ReactChildren } from 'react';

type ButtonProps = {
  children: string | ReactChildren | string & ReactChildren
  variant: string
  disabled?: boolean
}
type VocabularyType = {
  [key: string]: string
}

const Button = ({ children, variant, disabled }: ButtonProps) => {
  const vocabulary: VocabularyType = {
    primary: 'bg-main-600 text-white hover:bg-main-700',
    primaryOutline: 'border-blue-500 text-main-500 border hover:bg-main-600 hover:text-white',
    secondary: 'bg-green-600 text-white hover:bg-green-700',
    secondaryOutline: 'border-green-600 text-green-600 border hover:bg-green-600 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    dangerOutline: 'border-red-600 text-red-600 border hover:bg-red-600 hover:text-white',
  };
  const styles = () => `px-3 py-1.5 rounded-md cursor-pointer ${disabled ? 'filter grayscale cursor-not-allowed' : ''} ${vocabulary[variant]}`;

  return (
    <button
      type='button'
      className={styles()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;