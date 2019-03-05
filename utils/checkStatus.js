import styles from "../styles/styles";

checkStatus = arg => {
  if (typeof arg == "object") return;

  if (arg.includes("smooth") == 1) return [styles.size, styles.green];
  else if (arg.includes("not running") == 1) return [styles.size, styles.red];
  else if (arg.includes("slow") == 1) return [styles.size, styles.yellow];
  else if (arg.includes("crowded") == 1) return [styles.size, styles.yellow];
  else if (arg.includes("delayed") == 1) return [styles.size, styles.yellow];
  else return [styles.size, styles.black];
};

export default checkStatus;
