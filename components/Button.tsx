import React from 'react';

type ButtonProps = {
  className?: string
  children?: any
  variant?: 'primary' | 'primaryOutline' | 'secondary' | 'secondaryOutline' | 'danger' | 'dangerOutline'
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
  [key: string]: any
}

type VocabularyType = {
  [key: string]: string
}

const Button = (props: ButtonProps) => {
  const { children, variant = "primary", disabled, type = 'button' } = props;
  const vocabulary: VocabularyType = {
    primary: 'bg-main-600 text-white hover:bg-main-700 outline-main border-transparent ',
    primaryOutline: 'outline-main text-main-500 hover:bg-main-600 hover:text-white',
    secondary: 'bg-green-600 text-white outline-green hover:bg-green-700',
    secondaryOutline: 'outline-green text-green-600 hover:bg-green-600 hover:text-white',
    danger: 'bg-red-600 text-white outline-red hover:bg-red-700',
    dangerOutline: 'outline-red text-red-600 hover:bg-red-600 hover:text-white',
  };
  const based = 'inline-flex justify-center px-4 translate duration-300 py-2 rounded-md cursor-pointer text-sm font-medium'
  const styles = () => `${based} ${disabled ? 'filter grayscale cursor-not-allowed' : ''} ${vocabulary[variant]}`;

  return (
    <button
      {...props}
      className={`${styles()} ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
