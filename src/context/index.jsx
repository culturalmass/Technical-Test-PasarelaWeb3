"use client";

import { createContext, useContext, useState } from "react";

//Create the App Context to wrap the Root Layout with the useAppContext
const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [action, setAction] = useState({
    currenciesArray: "",
    toggle: false,
    amountForm: "",
    currentCurrency: "",
    currentIcon: "",
    currentSymbol: "",
    currentMinAmount: "",
    currentMaxAmount: "",
    conceptForm: "",
    filterCurrencyList: "",
    orderDetails: null,
    orderInfoArray: "",
    qrCorde: "",
  });
  return (
    <AppContext.Provider value={{ action, setAction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
