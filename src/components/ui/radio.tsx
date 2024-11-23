import {useCountRender} from '@utils/hooks/useCountRender';
import {useTheme} from '@utils/hooks/useTheme';
import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

interface RadioOptionComponentProps {
  isSelected: boolean;
}

const RadioButton = memo(({isSelected}: RadioOptionComponentProps) => {
  const {colors} = useTheme();
  useCountRender('RadioButton');

  const styles = useMemo(() => {
    return {
      option: {
        ...baseStyles.option,
        borderColor: colors.primary,
      },
      radioCircle: isSelected
        ? {
            ...baseStyles.radioCircle,
            backgroundColor: colors.primary,
          }
        : null,
    };
  }, [colors.primary, isSelected]);

  return (
    <View style={styles.option}>
      {isSelected && <View style={styles.radioCircle} />}
    </View>
  );
});

const baseStyles = StyleSheet.create({
  option: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

export default RadioButton;
