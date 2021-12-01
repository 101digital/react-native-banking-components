import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const TickIcon: React.FC<Props> = ({ size, color = '#17ba4d' }) => {
  return (
    <SvgCss
      xml={`<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.4999 12.6004L0.399902 6.60039L2.5999 4.40039L6.4999 8.40039L13.8999 0.900391L16.0999 3.10039L6.4999 12.6004Z"/>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { TickIcon };
