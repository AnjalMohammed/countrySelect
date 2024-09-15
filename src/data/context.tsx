import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCountryData } from "./api/countries";
import { ContextType, ListOption } from "./interfaces";

const DataContext = createContext<ContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [masterData, setMasterData] = useState<ListOption[] | undefined>();
  const [data, setData] = useState<ListOption[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState<string>();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchCountryData();
        setMasterData(result);
        setData(result);
      } catch (error) {
        throw new Error("Something went wrong with the api.");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    setData(
      masterData?.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(filterText?.toLocaleLowerCase() || "")
      )
    );
  }, [filterText]);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        filterText,
        setFilterText,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
