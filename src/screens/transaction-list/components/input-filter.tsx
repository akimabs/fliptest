import {useCountRender} from '@utils/hooks/useCountRender';
import {useTheme} from '@utils/hooks/useTheme';
import React, {useMemo} from 'react';
import IcSearch from '@components/icons/ic-search';
import IcChevronDown from '@components/icons/ic-chevron-down';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  onClickFilter: () => void;
  sortLabel: string;
  setValue: (str: string) => void;
}

function InputFilter({onClickFilter, sortLabel, setValue}: Props) {
  const {colors} = useTheme();
  useCountRender('InputFilter');

  const styles = useMemo(() => {
    return {
      filterText: {
        ...baseStyles.filterText,
        color: colors.primary,
      },
    };
  }, [colors]);

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.searchContainer}>
        <IcSearch />
        <TextInput
          style={baseStyles.input}
          placeholder="Cari nama, bank, atau nominal"
          placeholderTextColor="grey"
          onChangeText={(str: string) => setValue(str)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={baseStyles.filterButton}
        onPress={onClickFilter}>
        <Text style={styles.filterText}>{sortLabel}</Text>
        <IcChevronDown />
      </TouchableOpacity>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    marginLeft: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 15,
    marginRight: 4,
    fontWeight: '600',
  },
});

export default InputFilter;
