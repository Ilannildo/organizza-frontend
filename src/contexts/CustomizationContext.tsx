import React, { createContext, useState } from "react";

type CustomizationContextProps = {
  isOpen: any[];
  opened: boolean;
  borderRadius: number;
  menuOpen: (id: any) => void;
  setMenu: (opened: boolean) => void;
};

export const CustomizationContext = createContext<CustomizationContextProps>(
  {} as CustomizationContextProps
);

type CustomizationProviderProps = {
  children: React.ReactNode;
};

export const CustomizationProvider: React.FC<CustomizationProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<any[]>([]);
  const [opened, setOpened] = useState<boolean>(true);
  const borderRadius = 8;

  const menuOpen = (id: any) => {
    setIsOpen([id]);
  };

  const setMenu = (opened: boolean) => {
    setOpened(opened);
  };

  return (
    <CustomizationContext.Provider
      value={{
        isOpen,
        menuOpen,
        opened,
        setMenu,
        borderRadius,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
