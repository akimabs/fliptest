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
    _navigateTransactionDetail,
    _setFilterQuery,
    _handleSort,
    _setModalVisible,
  } = useTransactionList();
  const {colors} = useTheme();

  const styles = useMemo(() => {
    return {
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
    };
  }, [colors]);

  const renderTransaction = ({item}: {item: TransactionItemData}) => (
    <TransactionItem
      onPress={() => _navigateTransactionDetail(item)}
      from={item.sender_bank}
      to={item.beneficiary_bank}
      name={item.beneficiary_name}
      amount={item.amount}
      date={item.completed_at}
      status={item.status}
    />
  );

  const modalFilter = useCallback(() => {
    return (
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
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
    );
  }, [
    SORT_OPTIONS_DATA,
    _handleSort,
    _setModalVisible,
    modalVisible,
    sortOption.value,
    styles,
  ]);

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
