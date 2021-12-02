import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const DownDashlineIcon: React.FC<Props> = ({ size, color = '#17ba4d' }) => {
  return (
    <SvgCss
      xml={`<svg width="35" height="11" viewBox="0 0 35 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1.22788" y1="1.29835" x2="33.0651" y2="9.98123" stroke="#646876" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 6"/>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { DownDashlineIcon };
