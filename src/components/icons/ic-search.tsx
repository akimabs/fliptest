import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="grey"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
    {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
