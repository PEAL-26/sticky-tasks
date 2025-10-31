import { EllipsisIcon, PlusCircleIcon } from "lucide-react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { memo, useMemo, useState } from "react";

import { colors } from "../styles/colors";
import { GroupListData, SubtaskListData } from "./types";
import { TaskGroupListItemCard } from "./task-group-list-item-card";
import { destructuredObject } from "../helpers/destructured-object";

interface Props {
  onPress?(): void;
  data: GroupListData;
}

export function TaskGroupItemCardMemo(props: Props) {
  const { onPress } = props;

  const data = useMemo(() => props.data, [...destructuredObject(props.data)]);

  const [subtasks, setSubtasks] = useState<SubtaskListData[]>(() => {
    if (data.subtasks.length === 0) {
      return [{ description: "", priority: 1, status: "PENDING" }];
    }
    return data.subtasks;
  });
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <TouchableOpacity></TouchableOpacity>
        <View style={styles.groupInputContainer}>
          <View style={styles.divider} />
          <TextInput
            placeholder="Grupo"
            placeholderTextColor={`${colors.gray}`}
            style={styles.groupInput}
          />
          <View style={styles.divider} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.groupButton}>
            <EllipsisIcon size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>

      {subtasks.map((subtask, index) => (
        <TaskGroupListItemCard key={index} data={subtask} />
      ))}

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.7}>
          <PlusCircleIcon color={colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const TaskGroupItemCard = memo(TaskGroupItemCardMemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    //width: "100%",
    backgroundColor: colors.secondary,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //gap: 8,
  },
  groupContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
  },
  groupInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  groupInput: {
    width: 160,
    textAlign: "center",
    color: "#fff",
    backgroundColor: colors.secondary,
    marginHorizontal: 6,
    paddingVertical: 4,
  },
  groupButton: {
    width: 32,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksContainer: {
    marginTop: 12,
  },
  taskInput: {
    color: "#fff",
  },
  taskInputsContainer: {},
  taskInputFooter: {
    display: "flex",
    flexDirection: "row",
  },
  priorityText: {
    color: colors.secondary,
    fontSize: 10,
  },
  priorityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
