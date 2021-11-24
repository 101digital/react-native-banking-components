import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ConsumerDataRightIcon: React.FC<Props> = ({ size, color = '#17ba4d' }) => {
  return (
    <SvgCss
      xml={`<svg width="100" height="77" viewBox="0 0 100 77" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="100" height="76.4706" fill="url(#pattern0)"/>
      <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlink:href="#image0_1185_1361" transform="translate(0 -0.153846) scale(0.0025 0.00326923)"/>
      </pattern>
      <image id="image0_1185_1361" width="400" height="400" xlink:href="data:image/png;base64,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"/>
      </defs>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { ConsumerDataRightIcon };
