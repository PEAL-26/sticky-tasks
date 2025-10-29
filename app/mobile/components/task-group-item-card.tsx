import { ChevronDownIcon, EllipsisIcon, PlusIcon } from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/colors";
import { TaskGroupListItemCard } from "./task-group-list-item-card";

interface Props {
  onPress?(): void;
}

export function TaskGroupItemCard(props: Props) {
  const { onPress } = props;
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

      {Array.from({ length: 5 }).map((_, index) => (
        <TaskGroupListItemCard key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
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
