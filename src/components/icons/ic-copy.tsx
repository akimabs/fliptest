import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="#EB704E"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}>
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
    <Path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
