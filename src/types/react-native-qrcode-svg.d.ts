declare module 'react-native-qrcode-svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  export interface QRCodeProps extends SvgProps {
    value: string;
    size?: number;
    color?: string;
    backgroundColor?: string;
    logo?: any;
    logoSize?: number;
    logoBackgroundColor?: string;
    logoMargin?: number;
    logoBorderRadius?: number;
    getRef?: (ref: any) => void;
  }

  export const QRCode: React.FC<QRCodeProps>;
}