import { Loading } from "@/components/Loading"
import { useStores } from "@/models"
import { useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useTimer } from "@/utils/useTimer"
import { useFormattedUserData } from "@/utils/useFormattedUserData"
import { usePromiseInterval } from "@/utils/usePromiseInterval"

/**
 * This screen renders the user data as a single text box.
 * Starts a timer when the component is mounted
 * Returns a promise which is returned after calling 3 times each at an interval of 1 second.
 * This screen uses custom hooks to perform all the above functionalities and this will render the UI.
 * @returns An UI Screen
 */
export const DisplayUserTimerScreen = () => {
  // Getting the sesssion store
  const { sessionStore } = useStores()

  // Getting the formatted time from the custom hook
  const { formattedTime } = useTimer()

  // Getting the formatted user data from the custom hook
  const formatUserData = useFormattedUserData(sessionStore.positiveAgeUsers)

  // Custom hook to return alert when the promise is resolved
  const alertMessage = usePromiseInterval()

  // Hook to load the user as the component loads
  useEffect(() => {
    sessionStore.loadSession()
  }, [])

  // Showing the loading state when user is being fetched
  if (sessionStore.isLoading) {
    return <Loading />
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.valueContainer}>{formattedTime}</Text>
        </View>
        <View>
          {alertMessage != "" && <Text style={styles.valueContainer}>{alertMessage}</Text>}
        </View>
      </View>

      <Text style={styles.dataLabel}>User Information</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.dataValues}>{formatUserData} </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2d404b",
    padding: 20,
  },

  contentContainer: {
    paddingBottom: 40,
  },
  valueContainer: {
    backgroundColor: "#ffffff",
    padding: 5,
    fontWeight: "bold",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#999999",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 5,
  },
  dataContainer: {
    backgroundColor: "#202b33",
    marginTop: 10,
  },
  dataValues: {
    fontFamily: "Courier New",
    borderWidth: 2,
    borderColor: "#000000",
    padding: 10,
    color: "#fdf6e3",
  },
  dataLabel: {
    fontWeight: 400,
    fontSize: 18,
    marginTop: 15,
    color: "#ebe2bb",
    fontFamily: "Courier New",
  },
})
