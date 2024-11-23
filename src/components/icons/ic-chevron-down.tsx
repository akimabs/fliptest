import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="#eb704e"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
