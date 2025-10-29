import { StyleSheet, View } from "react-native";

type TaskData = {
  id: number;
};

interface Props {
  data: TaskData;
  onBack?(): void;
}

export function Task(props: Props) {
  const { data, onBack } = props;
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
  },
});
