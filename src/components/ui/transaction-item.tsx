/* eslint-disable react-hooks/exhaustive-deps */

import React, {memo, useMemo} from 'react';
import {CONSTANT} from '@utils/constant/constant';
import {useCountRender} from '@utils/hooks/useCountRender';
import {useTheme} from '@utils/hooks/useTheme';
import {View, Text, StyleSheet} from 'react-native';
import {formatDate} from '@utils/func/formatDate';

interface Props {
  from: string;
  to: string;
  name: string;
  amount: number;
  date: string;
  status: string;
}

const TransactionItem: React.FC<Props> = memo(
  ({from, to, name, amount, date, status}) => {
    const {colors} = useTheme();
    useCountRender();

    const styles = useMemo(() => {
      const isSuccess = status === CONSTANT.SUCCESS;
      return {
        container: {
          ...baseStyles.container,
          borderLeftColor: isSuccess ? colors.success : colors.primary,
        },
        statusBadge: {
          ...baseStyles.statusBadge,
          backgroundColor: isSuccess ? colors.success : colors.light,
          borderColor: isSuccess ? colors.success : colors.primary,
        },
        statusText: {
          color: isSuccess ? colors.textColorInverse : colors.textColor,
        },
      };
    }, [status]);

    const styledMemo = useMemo(
      () => [baseStyles.statusText, styles.statusText],
      [],
    );

    const formattedAmount = `${new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)} • ${formatDate(date)}`;

    const translatedValue =
      status === CONSTANT.SUCCESS ? 'Berhasil' : 'Pengecekan';

    return (
      <View style={styles.container}>
        <View style={baseStyles.textContainer}>
          <Text
            style={
              baseStyles.bankText
            }>{`${from.toUpperCase()} ➔ ${to.toUpperCase()}`}</Text>
          <Text style={baseStyles.nameText}>{`${name.toUpperCase()}`}</Text>
          <Text style={baseStyles.detailText}>{formattedAmount}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styledMemo}>{translatedValue}</Text>
        </View>
      </View>
    );
  },
);

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  bankText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
    borderWidth: 2,
    fontWeight: 'bold',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default TransactionItem;
