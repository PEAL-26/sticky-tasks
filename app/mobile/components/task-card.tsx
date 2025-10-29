import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";
import { EllipsisIcon } from "lucide-react-native";

interface Props {
  onPress?(): void;
}

export function TaskCard(props: Props) {
  const { onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Titulo</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <EllipsisIcon color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.resumeContainer}>
        <View style={styles.resumeListItemsContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Text style={styles.resumeText} numberOfLines={1}>
              Description
            </Text>
          ))}
        </View>

        <View style={styles.resumeFooter}>
          <Text style={styles.resumeFooterText}>Tarefas: 12</Text>
          <Text style={styles.resumeFooterText}>29 de Outubro de 2025</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
    color: `${colors.gray}70`,
    fontSize: 9,
  },
});
