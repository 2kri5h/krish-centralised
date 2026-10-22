import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Page not found.</Text>
      <Link href="/" style={styles.link}>
        Back to SARC
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFFFC",
    gap: 20,
  },
  title: { fontSize: 30, color: "#011627", fontWeight: "700" },
  link: { color: "#04724D", fontSize: 16, textDecorationLine: "underline" },
});
