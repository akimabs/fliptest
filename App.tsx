import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider} from '@utils/context/theme-context';
import StackNavigator from '@routes/index';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StatusBar animated={true} backgroundColor="white" />
        <SafeAreaView style={styles.container}>
          <StackNavigator />
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 12,
  },
});

export default App;
