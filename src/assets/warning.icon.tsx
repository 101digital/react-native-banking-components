import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const xml =
  '<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 405.332031c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031 21.332031 9.554687 21.332031 21.332031-9.554687 21.332031-21.332031 21.332031zm21.332031-106.664062c0 11.773437-9.554687 21.332031-21.332031 21.332031s-21.332031-9.558594-21.332031-21.332031v-170.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031zm0 0"/></svg>';

const BWarningIcon: React.FC<Props> = ({ width, height, color }) => {
  return <SvgCss xml={xml} width={width} height={height} fill={color ? color : 'yellow'} />;
};
export { BWarningIcon };
