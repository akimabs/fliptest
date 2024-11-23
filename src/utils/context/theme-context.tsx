import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {DARK_COLORS} from '@themes/dark-colors';
import {LIGHT_COLORS} from '@themes/light-colors';

interface Theme {
  colors: typeof LIGHT_COLORS;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
  }, []);

  const theme = useMemo(
    () => ({
      colors: isDarkTheme ? DARK_COLORS : LIGHT_COLORS,
      toggleTheme,
    }),
    [isDarkTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
