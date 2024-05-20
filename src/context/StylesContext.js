import React, { createContext } from 'react';

export const StylesContext = createContext();

export function StylesProvider({ styles, children }) {
  return (
    <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>
  );
}
