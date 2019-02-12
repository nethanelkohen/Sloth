import { StyleSheet } from "react-native";
import {
  sanFranciscoSpacing,
  iOSColors,
  sanFranciscoWeights
} from "react-native-typography";

checkStatus = arg => {
  if (typeof arg == "object") return;

  if (arg.includes("smooth") == 1) return [styles.size, styles.green];
  else if (arg.includes("not running") == 1) return [styles.size, styles.red];
  else if (arg.includes("slow") == 1) return [styles.size, styles.yellow];
  else if (arg.includes("crowded") == 1) return [styles.size, styles.yellow];
  else if (arg.includes("delayed") == 1) return [styles.size, styles.yellow];
  else return [styles.size, styles.black];
};

const styles = StyleSheet.create({
  size: {
    ...sanFranciscoWeights.heavy,
    fontSize: 24,
    letterSpacing: sanFranciscoSpacing(24)
  },
  green: { color: iOSColors.green },
  red: { color: iOSColors.red },
  yellow: { color: iOSColors.yellow },
  black: { color: iOSColors.black }
});

export default checkStatus;
