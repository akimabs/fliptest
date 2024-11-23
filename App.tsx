import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider} from '@utils/context/theme-context';
import StackNavigator from '@routes/index';

function App() {
  return (
    <ThemeProvider>
      <StatusBar animated={true} backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <StackNavigator />
      </SafeAreaView>
    </ThemeProvider>
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
