import React from 'react';
import TransactionItem from '@components/ui/transaction-item';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeProvider} from '@utils/context/theme-context';
import {data} from '@utils/data/data';

function App() {
  const transactions = Object.values(data);
  const renderTransaction = ({item}: {item: (typeof transactions)[0]}) => (
    <TransactionItem
      from={item.sender_bank}
      to={item.beneficiary_bank}
      name={item.beneficiary_name}
      amount={item.amount}
      date={item.completed_at}
      status={item.status}
    />
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 12,
  },
});

export default App;
