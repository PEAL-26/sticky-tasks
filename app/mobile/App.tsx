import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PlusIcon,
  SettingsIcon,
  LoaderIcon,
  SearchIcon,
} from "lucide-react-native";

import { colors } from "./styles/colors";
import { TaskCard } from "./components/task-card";
import { useState } from "react";
import { Task } from "./components/task";

export default function App() {
  const [task, setTask] = useState<{ id: number } | null>(null);

  const handlePressTask = (id: number) => {
    setTask({ id });
  };

  const handleBackTasksList = () => {
    setTask(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
          <PlusIcon color={`${colors.gray}50`} />
        </TouchableOpacity>
        <View style={styles.headerContainerButton}>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <LoaderIcon color={`${colors.gray}50`} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <SettingsIcon color={`${colors.gray}50`} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <Text style={styles.textTitle}>Tarefas Autoadesivas</Text>
        <View style={styles.searchBarInputContainer}>
          <TextInput
            placeholderTextColor={`${colors.gray}50`}
            placeholder="Pesquisar..."
            style={styles.searchBarInput}
          />
          <TouchableOpacity style={{ paddingLeft: 8, paddingRight: 12 }}>
            <SearchIcon color={`${colors.gray}50`} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {task === null ? (
          <View style={styles.listItemsContainer}>
            {Array.from({ length: 50 }).map((_, index) => (
              <TaskCard key={index} onPress={() => handlePressTask(index)} />
            ))}
          </View>
        ) : (
          <Task data={task} onBack={handleBackTasksList} />
        )}
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "column",
    paddingTop: 48,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 52,
  },
  headerContainerButton: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "transparent",
    paddingLeft: 8,
    paddingRight: 9,
    height: "100%",
  },
  buttonAdd: {
    width: 52,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  searchBarContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  searchBarInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    width: "100%",
  },
  searchBarInput: {
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8,
    color: "#fff",
    fontSize: 12,
    flex: 1,
    width: 50,
  },
  listItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 58,
  },
});
