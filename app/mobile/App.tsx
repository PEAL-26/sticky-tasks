import { SQLiteProvider } from "expo-sqlite";
import { MainApp } from "./components/main";
import { DatabaseProvider } from "./contexts/database";
import { DATABASE_NAME, migrateDb } from "./libs/db";

export default function App() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDb}>
      <DatabaseProvider>
        <MainApp />
      </DatabaseProvider>
    </SQLiteProvider>
  );
}
