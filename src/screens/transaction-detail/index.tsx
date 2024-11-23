import {useRoute, RouteProp} from '@react-navigation/native';
import {TransactionItemData} from '@utils/contract/transaction';
import {formatDate} from '@utils/func/formatDate';
import {useTheme} from '@utils/hooks/useTheme';
import React, {useMemo} from 'react';
import IcCopy from '@components/icons/ic-copy';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

type RootStackParamList = {
  TransactionDetail: {
    value: TransactionItemData;
  };
};

function TransactionDetail() {
  const {colors} = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'TransactionDetail'>>();
  const value = route.params.value;

  const formattedAmount = `${new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value.amount)}`.replace(/\s+/g, '');

  const styles = useMemo(() => {
    return {
      container: {
        ...baseStyles.container,
        backgroundColor: colors.light,
      },
      closeButton: {
        ...baseStyles.closeButton,
        color: colors.primary,
      },
      containerContent: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
      },
    };
  }, [colors]);

  return (
    <View style={styles.containerContent}>
      <View style={styles.container}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerText}>ID TRANSAKSI: #{value.id}</Text>
          <TouchableOpacity>
            <View style={baseStyles.copy}>
              <IcCopy />
            </View>
          </TouchableOpacity>
        </View>

        <View style={baseStyles.divider} />
        <View style={baseStyles.detailContainer}>
          <Text style={baseStyles.title}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>Tutup</Text>
          </TouchableOpacity>
        </View>
        <View style={baseStyles.divider} />

        <View style={baseStyles.transactionInfo}>
          <View style={baseStyles.transactionHeader}>
            <Text style={baseStyles.transactionTitle}>
              {value.sender_bank.toUpperCase()} ➔{' '}
              {value.beneficiary_bank.toUpperCase()}
            </Text>
          </View>

          <View style={baseStyles.row}>
            <View style={baseStyles.viewItem}>
              <Text style={baseStyles.label}>- {value.beneficiary_name}</Text>
              <Text style={baseStyles.value}>{value.account_number}</Text>
            </View>
            <View style={baseStyles.viewItem}>
              <Text style={baseStyles.label}>NOMINAL</Text>
              <Text style={baseStyles.value}>{formattedAmount}</Text>
            </View>
          </View>

          <View style={baseStyles.row}>
            <View style={baseStyles.viewItem}>
              <Text style={baseStyles.label}>BERITA TRANSFER</Text>
              <Text style={baseStyles.value}>{value.remark}</Text>
            </View>
            <View style={baseStyles.viewItem}>
              <Text style={baseStyles.label}>KODE UNIK</Text>
              <Text style={baseStyles.value}>{value.unique_code}</Text>
            </View>
          </View>

          <View style={baseStyles.row}>
            <View style={baseStyles.viewItem}>
              <Text style={baseStyles.label}>WAKTU DIBUAT</Text>
              <Text style={baseStyles.value}>
                {formatDate(value.created_at, 'long')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const {width} = Dimensions.get('window');

const baseStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  copy: {
    transform: 'scaleX(-1)',
    marginLeft: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    width,
    backgroundColor: 'lightgrey',
  },
  transactionInfo: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  transactionHeader: {
    marginBottom: 16,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  viewItem: {
    width: width / 2,
    alignSelf: 'flex-start',
  },
});

export default TransactionDetail;
