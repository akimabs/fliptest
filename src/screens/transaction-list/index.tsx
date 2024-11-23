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
  RefreshControl,
} from 'react-native';
import TransactionItem from '@components/ui/transaction-item';
import {ThemeProvider} from '@utils/context/theme-context';
import InputFilter from './components/input-filter';
import {useTransactionList} from './logic/useTransactionList';
import RadioButton from '@components/ui/radio';
import {useTheme} from '@utils/hooks/useTheme';
import {TransactionItemData} from '@utils/contract/transaction';
import {SortOptionItem} from '@utils/type/constant';

function TransactionList() {
  const {
    sortedTransactions,
    sortOption,
    SORT_OPTIONS_DATA,
    modalVisible,
    isLoading,
    refetch,
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

  const renderSort = useCallback(
    ({item}: {item: SortOptionItem}) => {
      return (
        <TouchableOpacity
          onPress={() => _handleSort(item)}
          key={item.value}
          style={baseStyles.optionButton}>
          <RadioButton isSelected={item.value === sortOption.value} />
          <Text style={baseStyles.optionText}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [_handleSort, sortOption.value],
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
            <FlatList
              data={SORT_OPTIONS_DATA}
              keyExtractor={item => item.value}
              renderItem={renderSort}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    ),
    [
      modalVisible,
      styles.modalContainer,
      styles.modalContent,
      SORT_OPTIONS_DATA,
      renderSort,
      _setModalVisible,
    ],
  );

  const renderLoadingSkeleton = () => (
    <View style={baseStyles.loadingContainer}>
      {Array.from({length: 5}).map((_, index) => (
        <View key={index} style={baseStyles.loadingItem} />
      ))}
    </View>
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <InputFilter
          onClickFilter={() => _setModalVisible(true)}
          sortLabel={sortOption.label}
          setValue={_setFilterQuery}
        />
        {isLoading ? (
          renderLoadingSkeleton()
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            data={sortedTransactions}
            keyExtractor={item => item.id}
            renderItem={renderTransaction}
            ListEmptyComponent={<Text>Tidak ada transaksi</Text>}
            contentContainerStyle={baseStyles.list}
          />
        )}
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
  loadingContainer: {justifyContent: 'center', alignItems: 'center'},
  loadingItem: {
    height: 92,
    width: '95%',
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    marginTop: 12,
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
