import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemeProvider} from '@utils/context/theme-context';
import StackNavigator from '@routes/index';

function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
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
