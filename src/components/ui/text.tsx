import React, {memo} from 'react';
import {Text as ReactNativeText} from 'react-native';

interface Props {
  children: string;
}

const Text = memo(({children}: Props) => {
  return <ReactNativeText>{children}</ReactNativeText>;
});

export default Text;
