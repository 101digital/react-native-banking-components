import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<Props> = ({ size, color = '#ffffff' }) => {
  return (
    <SvgCss
      xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.0664 2.40023L11.5998 0.933594L6.99976 5.60026L2.39974 0.933594L0.933105 2.40023L5.59977 7.00024L0.933105 11.6003L2.39974 13.0669L6.99976 8.40023L11.5998 13.0669L13.0664 11.6003L8.39974 7.00024L13.0664 2.40023Z"/>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { CloseIcon };
