import React, {memo, useCallback, useMemo} from 'react';
import {CONSTANT} from '@utils/type/constant';
import {useCountRender} from '@utils/hooks/useCountRender';
import {useTheme} from '@utils/hooks/useTheme';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {formatDate} from '@utils/func/formatDate';
import {formatAmount} from '@utils/func/formatAmount';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TransactionItemData} from '@utils/contract/transaction';

interface Props {
  item: TransactionItemData;
}

const TransactionItem: React.FC<Props> = memo(({item}) => {
  const {colors} = useTheme();
  useCountRender('TransactionItem');
  const {
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    amount,
    created_at,
    status,
  } = item;
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const _navigateTransactionDetail = useCallback(() => {
    navigate('TransactionDetail', {value: item});
  }, [item, navigate]);

  const styles = useMemo(() => {
    const isSuccess = status === CONSTANT.SUCCESS;
    return {
      wrapperComponent: {
        ...baseStyles.wrapperComponent,
        backgroundColor: isSuccess ? colors.success : colors.primary,
      },
      container: {
        ...baseStyles.container,
      },
      statusBadge: {
        ...baseStyles.statusBadge,
        backgroundColor: isSuccess ? colors.success : colors.light,
        borderColor: isSuccess ? colors.success : colors.primary,
      },
      statusText: {
        ...baseStyles.statusText,
        color: isSuccess ? colors.textColorInverse : colors.textColor,
      },
    };
  }, [colors, status]);

  const formattedAmount = `${formatAmount(amount).replace(
    /\s+/g,
    '',
  )} • ${formatDate(created_at, 'short')}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={_navigateTransactionDetail}
      style={styles.wrapperComponent}>
      <View style={styles.container}>
        <View style={baseStyles.textContainer}>
          <Text
            style={
              baseStyles.bankText
            }>{`${sender_bank.toUpperCase()} ➔ ${beneficiary_bank.toUpperCase()}`}</Text>
          <Text
            style={
              baseStyles.nameText
            }>{`${beneficiary_name.toUpperCase()}`}</Text>
          <Text style={baseStyles.detailText}>{formattedAmount}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingVertical: 17,
    backgroundColor: '#fff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  wrapperComponent: {
    paddingLeft: 7,
    marginBottom: 12,
    borderRadius: 8,
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
