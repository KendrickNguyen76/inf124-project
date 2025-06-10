import { createContext } from "react";

const ThemeContext = createContext({
  applyTheme: () => {},
});

export default ThemeContext;