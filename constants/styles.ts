type ThemeColorKeys =
  | 'primary50'
  | 'primary100'
  | 'primary200'
  | 'primary400'
  | 'primary500'
  | 'primary700'
  | 'primary800'
  | 'accent500'
  | 'gray700';

type GlobalStylesType = {
  colors: {
    [key in ThemeColorKeys]: string;
  };
};

export const GlobalStyles: GlobalStylesType = {
  colors: {
    primary50: '#cfeffd',
    primary100: '#a0defb',
    primary200: '#77cff8',
    primary400: '#44bdf5',
    primary500: '#1aacf0',
    primary700: '#0570c9',
    primary800: '#003b88',
    accent500: '#e6b30b',
    gray700: '#221c30',
  },
};
