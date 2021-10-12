import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CashflowIcon: React.FC<Props> = ({ size, color = 'white' }) => {
  return (
    <SvgCss
      xml={`<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.50609 11.5892C1.60763 11.5892 1.69224 11.5562 1.79377 11.5068C2.03069 11.3585 2.09838 11.0454 1.94608 10.8147C1.35379 9.92482 1.03227 8.90315 1.03227 7.81557C1.03227 4.78351 3.57063 2.29525 6.70127 2.29525H9.4427V3.16862C9.4427 3.3334 9.52731 3.48171 9.67961 3.54762C9.7473 3.58058 9.81499 3.59706 9.8996 3.59706C9.98422 3.59706 10.0688 3.58058 10.1365 3.53114L12.3364 2.16342C12.4718 2.08103 12.5395 1.9492 12.5395 1.8009C12.5395 1.65259 12.4549 1.50428 12.3364 1.43837L10.1365 0.0706478C10.0011 -0.011745 9.81499 -0.0282236 9.67961 0.0541692C9.52731 0.136562 9.4427 0.284869 9.4427 0.433176V1.30654H6.68435C2.99527 1.30654 0 4.22324 0 7.81557C0 9.08442 0.372293 10.3203 1.08303 11.3585C1.18457 11.5232 1.35379 11.5892 1.50609 11.5892Z" fill="white"/>
      <path d="M12.2857 4.28914C12.1334 4.05844 11.8119 3.99253 11.575 4.14084C11.3381 4.28914 11.2704 4.60223 11.4227 4.83293C12.015 5.72278 12.3365 6.76093 12.3365 7.83203C12.3365 10.8641 9.79814 13.3523 6.6675 13.3523H3.94299V12.479C3.94299 12.3142 3.85838 12.1659 3.70608 12.1C3.55378 12.0176 3.38455 12.0341 3.24917 12.1165L1.04926 13.4842C0.913881 13.5666 0.846191 13.6984 0.846191 13.8467C0.846191 13.995 0.930804 14.1433 1.04926 14.2092L3.24917 15.577C3.31686 15.6264 3.40147 15.6429 3.48609 15.6429C3.55378 15.6429 3.63839 15.6264 3.70608 15.5934C3.85838 15.511 3.94299 15.3627 3.94299 15.2144V14.3411H6.68442C10.3735 14.3411 13.3688 11.4244 13.3688 7.83203C13.3688 6.57966 12.9965 5.34377 12.2857 4.28914Z" fill="white"/>
      <path d="M6.68444 3.92664C4.4676 3.92664 2.67383 5.67336 2.67383 7.83205C2.67383 9.99075 4.4676 11.7375 6.68444 11.7375C8.90127 11.7375 10.695 9.99075 10.695 7.83205C10.695 5.67336 8.90127 3.92664 6.68444 3.92664ZM7.09058 9.77652V10.1885C7.09058 10.2709 7.02289 10.3533 6.92135 10.3533H6.44752C6.36291 10.3533 6.2783 10.2874 6.2783 10.1885V9.793C5.78755 9.72709 5.39833 9.34808 5.34757 8.8702C5.34757 8.82077 5.36449 8.78781 5.38141 8.75485C5.41526 8.7219 5.46602 8.70542 5.49987 8.70542H6.00754C6.09215 8.70542 6.15984 8.75485 6.15984 8.82077C6.19369 8.93612 6.29522 9.01851 6.41368 9.01851H6.83674C7.05673 9.01851 7.24288 8.8702 7.2598 8.67246C7.27672 8.55711 7.24288 8.45824 7.15826 8.37585C7.07365 8.29345 6.97212 8.24402 6.85366 8.24402H6.49829C6.15984 8.24402 5.82139 8.09571 5.6014 7.84853C5.36449 7.60135 5.26296 7.27178 5.2968 6.94221C5.34757 6.43138 5.75371 6.01941 6.2783 5.90406V5.4921C6.2783 5.40971 6.34599 5.32731 6.44752 5.32731H6.92135C7.00596 5.32731 7.09058 5.39323 7.09058 5.4921V5.88758C7.58133 5.9535 7.97054 6.33251 8.02131 6.81038C8.02131 6.85982 8.00438 6.89278 7.98746 6.92573C7.95362 6.95869 7.90285 6.97517 7.86901 6.97517H7.36133C7.27672 6.97517 7.20903 6.92573 7.19211 6.85982C7.15827 6.74447 7.05673 6.66208 6.93827 6.66208H6.51521C6.29522 6.66208 6.10908 6.81038 6.09215 7.00813C6.07523 7.12348 6.10908 7.22235 6.19369 7.32122C6.2783 7.40361 6.37983 7.45305 6.49829 7.45305H6.80289C7.44595 7.45305 8.00438 7.91445 8.05515 8.52415C8.13976 9.11738 7.69978 9.66117 7.09058 9.77652Z" fill="white"/>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { CashflowIcon };
