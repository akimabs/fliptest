import React, {memo, useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = memo(({children}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.safeArea, {opacity}]}>
      {children}
    </Animated.View>
  );
});

export default Wrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181818',
  },
});
