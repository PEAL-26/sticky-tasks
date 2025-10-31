import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  PlusIcon,
  SettingsIcon,
  LoaderIcon,
  SearchIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";

import { colors } from "../styles/colors";
import { useDatabase } from "../contexts/database";

import { TaskRegisterComponent } from "./task";
import { TaskListData, TaskType } from "./types";
import { TaskListItemCard } from "./task-list-item-card";

export function MainApp() {
  const dimensions = useWindowDimensions();

  const [tasks, setTasks] = useState<TaskListData[]>([]);
  const [task, setTask] = useState<TaskType | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { db, isLoading } = useDatabase();

  const handlePressTask = async (id: number) => {
    if (!db || refreshing || isLoading) return;

    // Fazer essa busca dentro do component para alterar as tarefas
    try {
      setRefreshing(true);
      const task = await db.tasks.getById(id);
      setTask(task);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const handleBackTasksList = async () => {
    if (refreshing) return;

    setTask(null);
    await loadingTasks();
  };

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    if (!db || isLoading) {
      setRefreshing(false);
      return;
    }

    await loadingTasks();

    setRefreshing(false);
  };

  const handleCreateTask = async () => {
    if (!db || refreshing) return;
    try {
      setRefreshing(true);
      const taskCreated = await db.tasks.create({
        title: "",
        progress: 0,
      });

      const task = await db.tasks.getById(taskCreated.id);
      setTask(task);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadingTasks = async () => {
    if (!db || refreshing) return;

    try {
      setRefreshing(true);
      const result = await db.tasks.listAll();
      setTasks(result);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    loadingTasks();
  }, [isLoading]);

  const showStateComponent = !isLoading || !refreshing;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleCreateTask}
        >
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 8,
          }}
        >
          {/* <Image
            source={require("./assets/icon.png")}
            style={{ height: 24, width: 24 }}
          /> */}
          <Text style={styles.textTitle}>Tarefas Autoadesivas</Text>
        </View>
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
      {task === null ? (
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.gray]}
            />
          }
        >
          {tasks.length ? (
            <View style={styles.listItemsContainer}>
              {tasks.map((task, index) => (
                <TaskListItemCard
                  key={index}
                  data={task}
                  onPress={() => handlePressTask(task.id)}
                />
              ))}
            </View>
          ) : showStateComponent ? (
            <View
              style={[
                styles.stateContainer,
                { height: dimensions.height - 140 },
              ]}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", marginTop: 32 }}
              >
                Nenhuma tarefa encontrada.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <TaskRegisterComponent data={task} onBack={handleBackTasksList} />
      )}
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
  stateContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
