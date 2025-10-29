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

type TaskData = {
  id: number;
};

interface Props {
  data: TaskData;
  onBack?(): void;
}

export function Task(props: Props) {
  const { data, onBack } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButtons} onPress={onBack}>
          <ArrowLeftIcon size={16} />
        </TouchableOpacity>
        <TextInput
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

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {Array.from({ length: 2 }).map((_, index) => (
            <TaskGroupItemCard key={index} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          1 Em Execução {" | "}
          <Text style={[styles.footerText, { color: "#FED700" }]}>
            10 Pendents
          </Text>
          {" | "}
          <Text style={[styles.footerText, { color: "#48D85F" }]}>
            0 concluídas
          </Text>
        </Text>
        <Text style={styles.footerText}>10%</Text>
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
