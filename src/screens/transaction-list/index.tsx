import React, {useCallback} from 'react';
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

  const renderTransaction = ({
    item,
  }: {
    item: (typeof sortedTransactions)[0];
  }) => (
    <TransactionItem
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
                style={styles.optionButton}
                onPress={() => _handleSort(option)}>
                <RadioButton isSelected={option.value === sortOption.value} />
                <Text style={styles.optionText}>{option.label}</Text>
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
    sortOption,
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
          contentContainerStyle={styles.list}
        />
        {modalFilter()}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  list: {
    padding: 12,
  },
  sortButton: {
    padding: 12,
    backgroundColor: '#ff6600',
    borderRadius: 4,
    alignItems: 'center',
    margin: 12,
  },
  sortButtonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
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
