import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

/**
 * This is used to render the Loading on the Screen
 * @returns A Loading page
 */
export const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text>Loading users...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
})
