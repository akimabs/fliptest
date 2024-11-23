import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import TransactionItem from '@components/ui/transaction-item';
import {ThemeProvider} from '@utils/context/theme-context';
import InputFilter from './components/input-filter';
import {useTransactionList} from './logic/useTransactionList';
import RadioButton from '@components/ui/radio';
import {useTheme} from '@utils/hooks/useTheme';
import {TransactionItemData} from '@utils/contract/transaction';

function TransactionList() {
  const {
    sortedTransactions,
    sortOption,
    SORT_OPTIONS_DATA,
    modalVisible,
    _setFilterQuery,
    _handleSort,
    _setModalVisible,
  } = useTransactionList();
  const {colors} = useTheme();

  const styles = useMemo(
    () => ({
      container: {
        ...baseStyles.container,
        backgroundColor: colors.backgroundColor,
      },
      modalContainer: {
        ...baseStyles.modalContainer,
        backgroundColor: colors.backdrop,
      },
      modalContent: {
        ...baseStyles.modalContent,
        backgroundColor: colors.backgroundColor,
      },
    }),
    [colors],
  );

  const renderTransaction = useCallback(
    ({item}: {item: TransactionItemData}) => <TransactionItem item={item} />,
    [],
  );

  const modalFilter = useCallback(
    () => (
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => _setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => _setModalVisible(false)}>
          <View style={styles.modalContent}>
            {SORT_OPTIONS_DATA.map(option => (
              <TouchableOpacity
                key={option.value}
                style={baseStyles.optionButton}
                onPress={() => _handleSort(option)}>
                <RadioButton isSelected={option.value === sortOption.value} />
                <Text style={baseStyles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    ),
    [
      modalVisible,
      styles.modalContainer,
      styles.modalContent,
      SORT_OPTIONS_DATA,
      _setModalVisible,
      sortOption.value,
      _handleSort,
    ],
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <InputFilter
          onClickFilter={() => _setModalVisible(true)}
          sortLabel={sortOption.label}
          setValue={_setFilterQuery}
        />
        <FlatList
          data={sortedTransactions}
          keyExtractor={item => item.id}
          renderItem={renderTransaction}
          ListEmptyComponent={<Text>Tidak ada transaksi</Text>}
          contentContainerStyle={baseStyles.list}
        />
        {modalFilter()}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  list: {
    padding: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  optionButton: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  optionText: {
    fontSize: 16,
  },
});

export default TransactionList;
