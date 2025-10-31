import { memo, useMemo } from "react";
import { EllipsisIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TaskListData } from "./types";
import { colors } from "../styles/colors";
import { destructuredObject } from "../helpers/destructured-object";

interface Props {
  onPress?(): void;
  data: TaskListData;
}

function TaskListItemCardMemo(props: Props) {
  const { onPress } = props;
  const data = useMemo(() => props.data, [...destructuredObject(props.data)]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {data.title || "Sem Título"}
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <EllipsisIcon size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.resumeContainer}>
        <View style={styles.resumeListItemsContainer}>
          {data.subtasks.map((sub, index) => (
            <Text key={index} style={styles.resumeText} numberOfLines={1}>
              {sub.description}
            </Text>
          ))}
        </View>

        <View style={styles.resumeFooter}>
          <Text style={styles.resumeFooterText}>
            Tarefas: {data.totalSubtasks}
          </Text>
          <Text style={styles.resumeFooterText}>
            {new Date(data.updatedAt).toLocaleDateString("pt-AO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const TaskListItemCard = memo(TaskListItemCardMemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: colors.gray,
    paddingHorizontal: 8,
    height: 28,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: colors.primary,
    fontWeight: "bold",
  },
  resumeContainer: {
    backgroundColor: colors.secondaryB,
  },
  resumeListItemsContainer: {
    padding: 8,
  },
  resumeText: {
    color: "#fff",
    fontSize: 10,
  },
  resumeFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  resumeFooterText: {
    color: colors.gray,
    fontSize: 9,
  },
});
