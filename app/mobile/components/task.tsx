import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/colors";
import { ArrowLeftIcon, EllipsisIcon, LoaderIcon } from "lucide-react-native";
import { TaskGroupItemCard } from "./task-group-item-card";
import { GroupListData, SubtaskListData, TaskType } from "./types";
import { useState } from "react";
import { useDatabase } from "contexts/database";

interface Props {
  data: TaskType;
  onBack?(): void;
}

export function TaskRegisterComponent(props: Props) {
  const { data, onBack } = props;

  const { db, isLoading } = useDatabase();

  const [title, setTitle] = useState(() => data.title);
  const [status, setStatus] = useState<{
    pending: number;
    done: number;
    started: number;
    progress: 0;
  }>({ pending: 0, done: 0, started: 0, progress: 0 });
  const [groups, setGroups] = useState<GroupListData[]>(() => {
    return [{ id: 0, subtasks: [] }];
  });

  let timeout: NodeJS.Timeout | undefined = undefined;
  const handleChangeTitle = (text: string) => {
    if (timeout) clearTimeout(timeout);
    setTitle(text);

    if (!db || isLoading) return;

    timeout = setTimeout(async () => {
      await db.tasks.update({
        id: data.id,
        title: text,
        progress: status.progress,
      });
    }, 500);
  };

  const updateStatus = () => {};

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButtons} onPress={onBack}>
          <ArrowLeftIcon size={16} />
        </TouchableOpacity>
        <TextInput
          value={title}
          onChangeText={(text) => handleChangeTitle(text)}
          placeholder="Sem título"
          placeholderTextColor={`${colors.primary}`}
          style={styles.titleInput}
        />
        <View style={styles.headerButtonsContainer}>
          <LoaderIcon size={16} />
          <TouchableOpacity style={styles.headerButtons}>
            <EllipsisIcon size={16} />
          </TouchableOpacity>
        </View>
      </View>

      {/* GROUP TASKS */}
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {groups.map((group, index) => (
            <TaskGroupItemCard key={index} data={group} />
          ))}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {status.started} Em Execução {" | "}
          <Text style={[styles.footerText, { color: "#FED700" }]}>
            {status.pending} Pendentes
          </Text>
          {" | "}
          <Text style={[styles.footerText, { color: "#48D85F" }]}>
            {status.done} concluídas
          </Text>
        </Text>
        <Text style={styles.footerText}>{status.progress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    paddingTop: 4,
  },
  header: {
    backgroundColor: colors.gray,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 28,
  },
  headerButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    height: "100%",
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    padding: 8,
    marginBottom: 32,
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 10,
  },
});
