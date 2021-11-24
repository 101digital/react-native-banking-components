import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ControlDataIcon: React.FC<Props> = ({ width, height, color }) => {
  return (
    <SvgCss
      xml={`<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12.5" cy="13.1688" rx="12.5" ry="12.1933" fill="#E0D7FF" fill-opacity="0.4"/>
      <g clip-path="url(#clip0_1185_1416)">
      <path d="M19.604 7.2627H7.32746C7.10876 7.2627 6.93141 7.43569 6.93141 7.64902V8.80798H6.39605C6.17735 8.80801 6 8.98098 6 9.19431V11.0103C6 11.2236 6.17735 11.3966 6.39605 11.3966H6.93141V14.5307H6.39605C6.17735 14.5307 6 14.7037 6 14.9171V16.733C6 16.9464 6.17735 17.1194 6.39605 17.1194H6.93141V18.2798C6.93141 18.4932 7.10876 18.6662 7.32746 18.6662H19.604C19.8226 18.6662 20 18.4932 20 18.2798V7.64902C20 7.43569 19.8227 7.2627 19.604 7.2627ZM6.79209 9.58064H8.45623V10.624H6.79209V9.58064ZM7.7235 11.3966H8.85225C9.07095 11.3966 9.2483 11.2236 9.2483 11.0103V9.58064H17.6237V16.3482H9.2483V14.917C9.2483 14.7037 9.07095 14.5307 8.85225 14.5307H7.7235V11.3966ZM6.79209 15.3034H7.32666C7.32691 15.3034 7.32718 15.3034 7.32743 15.3034C7.32768 15.3034 7.32795 15.3034 7.3282 15.3034H8.45621V16.3467H6.79209V15.3034ZM19.2079 17.8935H7.7235V17.1194H8.85225C8.85789 17.1194 8.86336 17.1188 8.86888 17.1186C8.88293 17.12 8.89715 17.1209 8.91162 17.1209H18.0198C18.2385 17.1209 18.4158 16.9479 18.4158 16.7346V9.19431C18.4158 8.98098 18.2385 8.80798 18.0198 8.80798H8.91162C8.90161 8.80798 8.89177 8.80875 8.88192 8.80945C8.87211 8.8087 8.86229 8.80798 8.85223 8.80798H7.7235V8.03535H19.2079L19.2079 17.8935Z" fill="#5637C2"/>
      <path d="M15.4041 14.3081C15.9891 13.5064 15.9891 12.421 15.4041 11.6192L15.7482 11.2835C15.9029 11.1326 15.9029 10.888 15.7482 10.7371C15.5936 10.5863 15.3429 10.5863 15.1881 10.7371L14.8442 11.0726C14.4443 10.794 13.9669 10.6432 13.4657 10.6432C12.9644 10.6432 12.4871 10.794 12.0872 11.0726L11.7432 10.7371C11.5886 10.5863 11.3379 10.5863 11.1831 10.7371C11.0285 10.888 11.0285 11.1326 11.1831 11.2835L11.5273 11.6192C10.9423 12.4209 10.9423 13.5064 11.5273 14.3082L11.1831 14.6439C11.0285 14.7947 11.0285 15.0393 11.1831 15.1902C11.2605 15.2656 11.3618 15.3034 11.4632 15.3034C11.5645 15.3034 11.6659 15.2656 11.7432 15.1902L12.0872 14.8547C12.4871 15.1333 12.9644 15.2841 13.4657 15.2841C13.967 15.2841 14.4443 15.1333 14.8442 14.8547L15.1881 15.1902C15.2655 15.2656 15.3668 15.3034 15.4682 15.3034C15.5695 15.3034 15.6709 15.2656 15.7482 15.1902C15.9029 15.0394 15.9029 14.7947 15.7482 14.6439L15.4041 14.3081ZM12.3437 14.0582C11.725 13.4547 11.725 12.4727 12.3437 11.8692C12.6434 11.5769 13.0419 11.4159 13.4657 11.4159C13.8896 11.4159 14.288 11.5769 14.5877 11.8692C15.2064 12.4727 15.2064 13.4547 14.5877 14.0582C14.288 14.3505 13.8896 14.5115 13.4657 14.5115C13.0419 14.5115 12.6434 14.3505 12.3437 14.0582Z" fill="#5637C2"/>
      <path d="M10.3308 20.051H8.15178C7.93309 20.051 7.75574 19.878 7.75574 19.6646C7.75574 19.4513 7.93309 19.2783 8.15178 19.2783H10.3308C10.5494 19.2783 10.7268 19.4513 10.7268 19.6646C10.7268 19.878 10.5495 20.051 10.3308 20.051Z" fill="#5637C2"/>
      <path d="M18.7797 20.051H16.6007C16.382 20.051 16.2047 19.878 16.2047 19.6646C16.2047 19.4513 16.382 19.2783 16.6007 19.2783H18.7797C18.9984 19.2783 19.1757 19.4513 19.1757 19.6646C19.1757 19.878 18.9984 20.051 18.7797 20.051Z" fill="#5637C2"/>
      </g>
      <defs>
      <clipPath id="clip0_1185_1416">
      <rect width="14" height="13.6564" fill="white" transform="translate(6 6.82812)"/>
      </clipPath>
      </defs>
      </svg>
      `}
      width={width}
      height={height}
      fill={color ? color : 'yellow'}
    />
  );
};
export { ControlDataIcon };
