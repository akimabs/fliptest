import {useCallback, useMemo, useState} from 'react';
import {CONSTANT, SortOptionItem} from '@utils/type/constant';
import {useDebounce} from '@utils/hooks/useDebounce';
import {getTransaction} from '@api/request/transaction';

export const useTransactionList = () => {
  const {data: dataTransaction, isLoading, refetch} = getTransaction.query({});

  const transactions = useMemo(() => {
    return Object.values(dataTransaction ?? {}).map(transaction => {
      if (transaction.status.toLowerCase() === 'pending') {
        return {...transaction, status: CONSTANT.PENDING};
      } else if (transaction.status.toLowerCase() === 'success') {
        return {...transaction, status: CONSTANT.SUCCESS};
      }
      return transaction;
    });
  }, [dataTransaction]);

  const [filterQuery, setFilterQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOptionItem>({
    label: 'URUTKAN',
    value: 'urutkan',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const _setValueSortOption = useCallback(
    (val: SortOptionItem) => setSortOption(val),
    [],
  );

  const _setModalVisible = useCallback(
    (val: boolean) => setModalVisible(val),
    [],
  );

  const _setFilterQuery = useDebounce((val: string) => {
    setFilterQuery(val);
  }, 300);

  const _handleSort = useCallback(
    (option: SortOptionItem) => {
      _setValueSortOption(option);
      setModalVisible(false);
    },
    [_setValueSortOption],
  );

  const SORT_OPTIONS_DATA: SortOptionItem[] = useMemo(
    () => [
      {label: 'URUTKAN', value: 'urutkan'},
      {label: 'Nama A-Z', value: 'name-asc'},
      {label: 'Nama Z-A', value: 'name-desc'},
      {label: 'Tanggal Terbaru', value: 'date-newest'},
      {label: 'Tanggal Terlama', value: 'date-oldest'},
    ],
    [],
  );

  const filteredTransactions = useMemo(() => {
    if (!filterQuery) {
      return transactions;
    }

    const queryLower = filterQuery.toLowerCase();
    return transactions.filter(tx =>
      Object.values(tx).some(value => {
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value).toLowerCase().includes(queryLower);
        }
        return false;
      }),
    );
  }, [filterQuery, transactions]);

  const sortedTransactions = useMemo(() => {
    if (!filteredTransactions) {
      return [];
    }
    const sorted = [...filteredTransactions];

    sorted.sort((transactionA, transactionB) => {
      switch (sortOption?.value) {
        case 'name-asc':
          return transactionA.beneficiary_name.localeCompare(
            transactionB.beneficiary_name,
          );
        case 'name-desc':
          return transactionB.beneficiary_name.localeCompare(
            transactionA.beneficiary_name,
          );
        case 'date-newest':
          return new Date(transactionB.created_at) >
            new Date(transactionA.created_at)
            ? 1
            : -1;
        case 'date-oldest':
          return new Date(transactionA.created_at) >
            new Date(transactionB.created_at)
            ? 1
            : -1;
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredTransactions, sortOption]);

  return {
    sortedTransactions,
    sortOption,
    modalVisible,
    SORT_OPTIONS_DATA,
    filterQuery,
    isLoading,
    refetch,
    _setFilterQuery,
    _handleSort,
    _setModalVisible,
    _setValueSortOption,
  };
};
