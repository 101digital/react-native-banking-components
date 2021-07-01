import { defaultAlertStyle } from './alert/styles';
import { defaultButtonStyle } from './button/styles';
import { BankingThemeProps } from './types';

export const defaultTheme: BankingThemeProps = {
  primaryColor: '#0073F0',
  textColor: 'black',
  secondTextColor: '#0D2050',
  buttonTheme: defaultButtonStyle,
  fonts: {},
  alertTheme: defaultAlertStyle,
};
