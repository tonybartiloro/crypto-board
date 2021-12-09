import { createContext, useContext } from "react";

const CurrencyContext = createContext();

export default CurrencyContext;
export const useCurrencyContext = () => useContext(CurrencyContext);
