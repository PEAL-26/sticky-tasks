import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { setupDb } from "../libs/db";

type Database = ReturnType<typeof setupDb>;

interface DatabaseContextProps {
  db: Database | null;
  isLoading: boolean;
}

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseContext = createContext({} as DatabaseContextProps);

export function DatabaseProvider(props: DatabaseProviderProps) {
  const { children } = props;

  const connection = useSQLiteContext();
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (connection) {
        const result = setupDb(connection);
        setDb(result);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
}
