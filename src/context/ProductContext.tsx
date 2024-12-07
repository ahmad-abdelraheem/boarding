import { createContext, useContext, useState, ReactNode } from "react";

interface IProductContext {
  selection: number;
  setSelection: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductContext = createContext<IProductContext | undefined>(
  undefined
);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContext.Provider"
    );
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selection, setSelection] = useState();
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductContext.Provider
      value={{ selection, setSelection, quantity, setQuantity }}
    >
      {children}
    </ProductContext.Provider>
  );
};
