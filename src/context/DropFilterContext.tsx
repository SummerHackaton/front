import React from 'react';

export const DropFilterContext = React.createContext<{
  filtro: string;
  setFiltro: (v: string) => void;
}>({ filtro: 'COINS', setFiltro: () => {} });

export const DropFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filtro, setFiltro] = React.useState('COINS');

  return (
    <DropFilterContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </DropFilterContext.Provider>
  );
};