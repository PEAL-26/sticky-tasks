import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/colors";
import { memo, useMemo, useState } from "react";
import {
  EllipsisIcon,
  PlusIcon,
  TextAlignJustifyIcon,
  TrashIcon,
} from "lucide-react-native";
import { SubtaskListData } from "./types";
import { destructuredObject } from "../helpers/destructured-object";

interface Props {
  onPress?(): void;
  data: SubtaskListData;
}

type PriorityStatusTypes = "MIN" | "NOR" | "MAX";
const PRIORITY_STATUS: Record<
  PriorityStatusTypes,
  { color: string; code: number }
> = {
  MIN: { color: "#FFFFFF", code: 0 },
  NOR: { color: "#FED700", code: 1 },
  MAX: { color: "#E95B69", code: 2 },
};

function TaskGroupListItemCardMemo(props: Props) {
  const { onPress } = props;
  
  const data = useMemo(() => props.data, [...destructuredObject(props.data)]);

  const [priorityStatus, setPriorityStatus] =
    useState<PriorityStatusTypes>("NOR");

  const handleChangePriorityStatus = (status: PriorityStatusTypes) => {
    setPriorityStatus(status);
  };

  const getStatusStyle = (status: PriorityStatusTypes) => {
    const currentStatus = PRIORITY_STATUS[priorityStatus];

    if (status === priorityStatus) {
      return {
        container: { backgroundColor: currentStatus.color },
        text: { color: colors.secondary },
      };
    }

    return {};
  };

  return (
    <View style={styles.tasksContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <TextAlignJustifyIcon size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.taskInputsContainer}>
        <TextInput
          placeholder="Tarefa"
          numberOfLines={1}
          placeholderTextColor={`${colors.gray}90`}
          style={[
            styles.taskInput,
            {
              borderWidth: 1,
              borderColor: `${colors.gray}90`,
              paddingHorizontal: 4,
              paddingVertical: 2,
            },
          ]}
        />
        <View style={styles.taskInputFooter}>
          <TextInput
            placeholder="Responsável"
            numberOfLines={2}
            placeholderTextColor={`${colors.gray}90`}
            style={[styles.taskInput, { flex: 1, color: "#ffffff70" }]}
          />

          <View style={styles.priorityContainer}>
            <TouchableOpacity
              onPress={() => handleChangePriorityStatus("MIN")}
              style={[
                styles.priorityStatusButton,
                getStatusStyle("MIN")?.container,
              ]}
            >
              <Text
                style={[styles.priorityStatusText, getStatusStyle("MIN")?.text]}
              >
                Mínima
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChangePriorityStatus("NOR")}
              style={[
                styles.priorityStatusButton,
                getStatusStyle("NOR")?.container,
              ]}
            >
              <Text
                style={[styles.priorityStatusText, getStatusStyle("NOR")?.text]}
              >
                Normal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChangePriorityStatus("MAX")}
              style={[
                styles.priorityStatusButton,
                getStatusStyle("MAX")?.container,
              ]}
            >
              <Text
                style={[styles.priorityStatusText, getStatusStyle("MAX")?.text]}
              >
                Urgente
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <PlusIcon size={20} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <EllipsisIcon size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const TaskGroupListItemCard = memo(TaskGroupListItemCardMemo);

const styles = StyleSheet.create({
  tasksContainer: {
    marginTop: 8,
    marginBottom: 8,
    // paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    // gap: 4,
  },
  button: {
    width: 32,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  taskInput: {
    color: "#fff",
    fontSize: 12,
  },
  taskInputsContainer: {
    flex: 1,
  },
  taskInputFooter: {
    display: "flex",
    flexDirection: "row",
  },
  priorityText: {
    color: "#fff",
    fontSize: 10,
  },
  priorityStatusText: {
    fontSize: 8,
    color: "#fff",
  },
  priorityStatusButton: {
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.secondary,
  },
  priorityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
